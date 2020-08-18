module.exports = {
  preset: '@vue/cli-plugin-unit-jest',

  // Setup
  setupFiles: ['./tests/test-setup.js'],

  // Module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(scss|sass|css)$': 'identity-obj-proxy'
  }
}
