module.exports = {
    'root': true,
    "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true,
      "cypress/globals": true
    },
    'extends': 'eslint:recommended',
    'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
      'ecmaVersion': 2018,
      'ecmaFeatures': {
        'jsx': true,
        'modules': true
      },
      'sourceType': 'module'
    },
    'ignorePatterns': ['test.js', 'node_modules/'],
    "plugins": [
      "react", "jest", "cypress"
  ],
    'rules': {
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
      'no-unused-vars': 'off'
  
    }
  }