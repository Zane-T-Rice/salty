module.exports = {
  roots: ['<rootDir>/build'],
  testMatch: ['**/*.test.js'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // This overrides the default that was blocking uuid
    '/node_modules/(?!(uuid)/)'
  ],
  moduleNameMapper: {
    // Helps Jest find the entry point
    '^uuid$': require.resolve('uuid'),
  },
 "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
  "prettierPath": "prettier-2"
};