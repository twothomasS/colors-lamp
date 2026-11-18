
const API_BASE_URL =
  process.env.API_BASE_URL || 'http://127.0.0.1:8000';

const TEST_USER_ID = 1;
const TEST_LOGIN = 'jest_test_user';
const TEST_PASSWORD = 'jest_test_password';
const TEST_COLOR = 'CI Test Blue';

async function post(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  expect(response.ok).toBe(true);

  return response.json();
}

describe('Colors LAMP API Integration Tests', () => {

  // TEST 1: ADD COLOR
  test('AddColor.php - successfully adds a color', async () => {
    const result = await post('AddColor.php', {
      color: TEST_COLOR,
      userId: TEST_USER_ID
    });

    expect(result).toEqual({
      error: ''
    });
  });

  // TEST 2: LOGIN
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

  // TEST 3: SEARCH COLORS
  test('SearchColors.php - finds the newly added color', async () => {
    const result = await post('SearchColors.php', {
      search: 'CI Test Blue',
      userId: TEST_USER_ID
    });

    expect(result.error).toBe('');
    expect(result.results).toContain(TEST_COLOR);
  });

  // TEST 4: INVALID LOGIN
  test('Login.php - rejects invalid credentials', async () => {
    const result = await post('Login.php', {
      login: TEST_LOGIN,
      password: 'incorrect_password'
    });

    expect(result.id).toBe(0);
    expect(result.error).toBe('No Records Found');
  });

  // TEST 5: SEARCH WITH NO MATCHES
  test('SearchColors.php - returns an error when no colors match', async () => {
    const result = await post('SearchColors.php', {
      search: 'DefinitelyNotARealColor123',
      userId: TEST_USER_ID
    });

    expect(result.error).toBe('No Records Found');
  });

});
