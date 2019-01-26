module.exports = {
  'extends': [
    'airbnb',
  ],
  "parser": "babel-eslint",
  'rules': {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'react/jsx-filename-extension': 'off',
  },
  'globals': {
    'window': true,
    'document': true,
    'location': true,
    'localStorage': true,
  },
  'env': {
    'jest/globals': true,
    "es6":     true,
    "browser": true
  },
  'plugins': [
    'jest',
    'react'
  ],
};
