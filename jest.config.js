module.exports = {
 // Only look for tests in build directory.
 roots: ['<rootDir>/build'],
 transformIgnorePatterns: [
   // Do transform uuid.
   '<rootDir>/node_modules/(?!(uuid)/)'
 ],
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