const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  restoreMocks: true,
  testTimeout: 5000,
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/test/'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js'],
};
