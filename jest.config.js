
module.exports = {
  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/tests/frontend/**/*.test.js',
    '<rootDir>/tests/integration/**/*.test.js'
  ],

  clearMocks: true,

  verbose: true
};
