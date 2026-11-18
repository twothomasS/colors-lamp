
const {
  validateLoginInput,
  validateColorName,
  normalizeColorName
} = require('../../public/js/color-utils');

describe('Login Input Validation', () => {

  test('accepts valid login credentials', () => {
    expect(
      validateLoginInput('testuser', 'password123')
    ).toBe(true);
  });

  test('rejects an empty username', () => {
    expect(
      validateLoginInput('', 'password123')
    ).toBe(false);
  });

  test('rejects an empty password', () => {
    expect(
      validateLoginInput('testuser', '')
    ).toBe(false);
  });

  test('rejects whitespace-only credentials', () => {
    expect(
      validateLoginInput('   ', '   ')
    ).toBe(false);
  });

});

describe('Color Input Validation', () => {

  test('accepts a valid color name', () => {
    expect(validateColorName('Blue')).toBe(true);
  });

  test('rejects an empty color name', () => {
    expect(validateColorName('')).toBe(false);
  });

  test('rejects whitespace-only color names', () => {
    expect(validateColorName('   ')).toBe(false);
  });

  test('rejects non-string color values', () => {
    expect(validateColorName(123)).toBe(false);
  });

});

describe('Color Name Normalization', () => {

  test('converts color names to lowercase', () => {
    expect(normalizeColorName('BLUE')).toBe('blue');
  });

  test('removes leading and trailing whitespace', () => {
    expect(normalizeColorName(' Blue ')).toBe('blue');
  });

});
