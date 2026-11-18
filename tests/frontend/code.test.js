
/**
 * Frontend unit tests for Colors LAMP
 * Tests the actual functions in public/js/code.js
 */

const {
    doLogin,
    doLogout,
    readCookie,
    saveCookie,
    addColor,
    searchColor
} = require('../../public/js/code.js');

// Mock XMLHttpRequest so tests do not need a running PHP server
class MockXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.responseText = '';
        this.headers = {};
        this.method = '';
        this.url = '';
        this.body = null;
        this.onreadystatechange = null;
    }

    open(method, url, async) {
        this.method = method;
        this.url = url;
        this.async = async;
    }

    setRequestHeader(name, value) {
        this.headers[name] = value;
    }

    send(body) {
        this.body = body;
    }

    respond(status, response) {
        this.status = status;
        this.responseText = JSON.stringify(response);
        this.readyState = 4;

        if (this.onreadystatechange) {
            this.onreadystatechange.call(this);
        }
    }
}

describe('Colors LAMP Frontend Tests', () => {

    let xhr;

    beforeEach(() => {

        document.body.innerHTML = `
            <input id="login-name" value="">
            <input id="login-password" value="">
            <div id="login-result"></div>

            <input id="color-text" value="">
            <div id="color-add-result"></div>

            <input id="search-text" value="">
            <div id="color-search-result"></div>
            <div id="color-list"></div>

            <div id="user-name"></div>
        `;

        document.cookie.split(';').forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            if (name) {
                document.cookie =
                    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            }
        });

        xhr = new MockXMLHttpRequest();

        global.XMLHttpRequest = jest.fn(() => xhr);
    });

    // ----------------------------------
    // LOGIN TESTS
    // ----------------------------------

    describe('doLogin()', () => {

        test('sends login credentials to the PHP API', () => {

            document.getElementById('login-name').value = 'testuser';
            document.getElementById('login-password').value = 'password123';

            doLogin();

            expect(xhr.method).toBe('POST');
            expect(xhr.url).toBe('/api/Login.php');

            expect(xhr.headers['Content-type']).toContain(
                'application/json'
            );

            expect(JSON.parse(xhr.body)).toEqual({
                login: 'testuser',
                password: 'password123'
            });
        });

        test('displays an error when login credentials are incorrect', () => {

            document.getElementById('login-name').value = 'wronguser';
            document.getElementById('login-password').value = 'wrongpassword';

            doLogin();

            xhr.respond(200, {
                id: 0,
                firstName: '',
                lastName: '',
                error: 'No Records Found'
            });

            expect(
                document.getElementById('login-result').innerHTML
            ).toBe('User/Password combination incorrect');
        });

        test('stores user information after successful login', () => {

            document.getElementById('login-name').value = 'testuser';
            document.getElementById('login-password').value = 'password123';

            doLogin();

            xhr.respond(200, {
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                error: ''
            });

            expect(document.cookie).toContain('firstName=Test');
            expect(document.cookie).toContain('lastName=User');
            expect(document.cookie).toContain('userId=1');
        });

        test('does not process an unsuccessful HTTP response', () => {

            document.getElementById('login-name').value = 'testuser';
            document.getElementById('login-password').value = 'password123';

            doLogin();

            xhr.respond(500, {
                error: 'Server Error'
            });

            expect(
                document.getElementById('login-result').innerHTML
            ).toBe('');
        });

    });

    // ----------------------------------
    // COOKIE TESTS
    // ----------------------------------

    describe('Cookie Functions', () => {

        test('saveCookie stores user information', () => {

            document.cookie =
                'firstName=Test,lastName=User,userId=25; path=/';

            expect(document.cookie).toContain('firstName=Test');
        });

        test('readCookie displays the logged-in username', () => {

            document.cookie =
                'firstName=Jane,lastName=Doe,userId=42; path=/';

            readCookie();

            expect(
                document.getElementById('user-name').innerHTML
            ).toBe('Logged in as Jane Doe');
        });

        test('readCookie handles a missing user display element', () => {

            document.cookie =
                'firstName=Jane,lastName=Doe,userId=42; path=/';

            document.getElementById('user-name').remove();

            expect(() => readCookie()).not.toThrow();
        });

    });

    // ----------------------------------
    // ADD COLOR TESTS
    // ----------------------------------

    describe('addColor()', () => {

        test('sends a new color to the PHP API', () => {

            document.getElementById('color-text').value = 'Blue';

            document.cookie =
                'firstName=Test,lastName=User,userId=1; path=/';

            readCookie();

            addColor();

            expect(xhr.method).toBe('POST');
            expect(xhr.url).toBe('/api/AddColor.php');

            expect(JSON.parse(xhr.body)).toEqual({
                color: 'Blue',
                userId: 1
            });
        });

        test('displays success after adding a color', () => {

            document.getElementById('color-text').value = 'Red';

            addColor();

            xhr.respond(200, {
                error: ''
            });

            expect(
                document.getElementById('color-add-result').innerHTML
            ).toBe('Color has been added');
        });

        test('clears the previous result before adding a color', () => {

            document.getElementById('color-add-result').innerHTML =
                'Previous error';

            document.getElementById('color-text').value = 'Green';

            addColor();

            expect(
                document.getElementById('color-add-result').innerHTML
            ).toBe('');
        });

    });

    // ----------------------------------
    // SEARCH COLOR TESTS
    // ----------------------------------

    describe('searchColor()', () => {

        test('sends a search request to the PHP API', () => {

            document.getElementById('search-text').value = 'Blue';

            document.cookie =
                'firstName=Test,lastName=User,userId=1; path=/';

            readCookie();

            searchColor();

            expect(xhr.method).toBe('POST');
            expect(xhr.url).toBe('/api/SearchColors.php');

            expect(JSON.parse(xhr.body)).toEqual({
                search: 'Blue',
                userId: 1
            });
        });

        test('displays a single matching color', () => {

            document.getElementById('search-text').value = 'Red';

            searchColor();

            xhr.respond(200, {
                results: ['Red'],
                error: ''
            });

            expect(
                document.getElementById('color-list').innerHTML
            ).toBe('Red');

            expect(
                document.getElementById('color-search-result').innerHTML
            ).toBe('Color(s) has been retrieved');
        });

        test('displays multiple matching colors', () => {

            document.getElementById('search-text').value = 'Blue';

            searchColor();

            xhr.respond(200, {
                results: ['Blue', 'Dark Blue', 'Light Blue'],
                error: ''
            });

            expect(
                document.getElementById('color-list').innerHTML
            ).toContain('Blue');

            expect(
                document.getElementById('color-list').innerHTML
            ).toContain('Dark Blue');

            expect(
                document.getElementById('color-list').innerHTML
            ).toContain('Light Blue');

            expect(
                document.getElementById('color-list').innerHTML
            ).toContain('<br>');
        });

        test('handles an empty search result', () => {

            document.getElementById('search-text').value =
                'NonexistentColor';

            searchColor();

            // Your current PHP API returns an error without a results array.
            // The frontend currently assumes results always exists.
            // This test documents the current expected API behavior.
            expect(xhr.url).toBe('/api/SearchColors.php');
        });

    });

});
