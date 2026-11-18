
module.exports = {
    testEnvironment: 'jsdom',

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    roots: [
        '<rootDir>/tests'
    ],

    testMatch: [
        '**/frontend/**/*.test.js',
        '**/integration/**/*.test.js'
    ],

    clearMocks: true,

    verbose: true
};
