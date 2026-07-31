// @ts-check

const tseslint = require('typescript-eslint');

const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        [
          {
            type: 'attribute',
            prefix: 'sui',
            style: 'camelCase',
          },
          // Some directives share a selector with their component, e.g. <sui-checkbox>.
          {
            type: 'element',
            prefix: 'sui',
            style: 'kebab-case',
          },
        ],
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sui',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
);
