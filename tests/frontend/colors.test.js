
const {
  filterColors
} = require('../../public/js/color-utils');

describe('Color Searching and Filtering', () => {

  const colors = [
    'Red',
    'Blue',
    'Green',
    'Dark Blue',
    'Light Blue',
    'Yellow'
  ];

  test('finds an exact color match', () => {
    expect(filterColors(colors, 'Red')).toEqual(['Red']);
  });

  test('finds partial color matches', () => {
    expect(filterColors(colors, 'Blue')).toEqual([
      'Blue',
      'Dark Blue',
      'Light Blue'
    ]);
  });

  test('search is case insensitive', () => {
    expect(filterColors(colors, 'blue')).toEqual([
      'Blue',
      'Dark Blue',
      'Light Blue'
    ]);
  });

  test('returns an empty array when no matches exist', () => {
    expect(filterColors(colors, 'Purple')).toEqual([]);
  });

  test('returns all colors for an empty search', () => {
    expect(filterColors(colors, '')).toEqual(colors);
  });

  test('handles an empty color list', () => {
    expect(filterColors([], 'Blue')).toEqual([]);
  });

  test('handles invalid color lists', () => {
    expect(filterColors(null, 'Blue')).toEqual([]);
  });

});
