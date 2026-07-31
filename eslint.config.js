// @ts-check

const eslint = require('@eslint/js');

const tseslint = require('typescript-eslint');

const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'methods'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/no-input-rename': 'warn',
      '@angular-eslint/no-output-rename': 'warn',
      '@angular-eslint/no-output-on-prefix': 'warn',
    },
  },
  {
    files: ['projects/lib/**/*.ts'],
    rules: {
    },
  },
  {
    files: ['projects/demo/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['app', 'demo', 'example'],
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // `== undefined` as a null check is used on purpose
      '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
      // TODO: Semantic UI puts event handlers on plain elements. Needs a rework per component.
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      // TODO: labels are not tied to their input yet.
      '@angular-eslint/template/label-has-associated-control': 'warn',
    },
  },
);
