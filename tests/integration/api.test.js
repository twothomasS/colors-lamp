
/**
 * @jest-environment node
 */

const http = require('node:http');

const API_BASE_URL =
  process.env.API_BASE_URL || 'http://127.0.0.1:8000';

const TEST_USER_ID = 1;
const TEST_LOGIN = 'jest_test_user';
const TEST_PASSWORD = 'jest_test_password';
const TEST_COLOR = 'CI Test Blue';

// Send JSON POST requests to the PHP API
async function post(endpoint, data) {
  const url = new URL(`/api/${endpoint}`, API_BASE_URL);

  const body = JSON.stringify(data);

  return new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      (response) => {
        let responseData = '';

        response.on('data', chunk => {
          responseData += chunk;
        });

        response.on('end', () => {
          if (
            response.statusCode < 200 ||
            response.statusCode >= 300
          ) {
            return reject(
              new Error(`HTTP error: ${response.statusCode}`)
            );
          }

          try {
            resolve(JSON.parse(responseData));
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    request.on('error', reject);

    request.write(body);
    request.end();
  });
}

describe('Colors LAMP API Integration Tests', () => {

  test('AddColor.php - successfully adds a color', async () => {
    const result = await post('AddColor.php', {
      color: TEST_COLOR,
      userId: TEST_USER_ID
    });

    expect(result).toEqual({
      error: ''
    });
  });

  test('Login.php - successfully authenticates a user', async () => {
    const result = await post('Login.php', {
      login: TEST_LOGIN,
      password: TEST_PASSWORD
    });

    expect(result.error).toBe('');
    expect(result.id).toBe(TEST_USER_ID);
    expect(result.firstName).toBe('Jest');
    expect(result.lastName).toBe('Tester');
  });

  test('SearchColors.php - finds the newly added color', async () => {
    const result = await post('SearchColors.php', {
      search: TEST_COLOR,
      userId: TEST_USER_ID
    });

    expect(result.error).toBe('');
    expect(result.results).toContain(TEST_COLOR);
  });

  test('Login.php - rejects invalid credentials', async () => {
    const result = await post('Login.php', {
      login: TEST_LOGIN,
      password: 'incorrect_password'
    });

    expect(result.id).toBe(0);
    expect(result.error).toBe('No Records Found');
  });

  test('SearchColors.php - returns an error when no colors match', async () => {
    const result = await post('SearchColors.php', {
      search: 'DefinitelyNotARealColor123',
      userId: TEST_USER_ID
    });

    expect(result.error).toBe('No Records Found');
  });

});
