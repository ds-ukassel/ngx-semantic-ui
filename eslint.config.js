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
      // TODO: Migrate all components to OnPush change detection
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      // Empty bodies are intentional for default options and hooks.
      '@typescript-eslint/no-empty-function': 'off',
      // Params often only exist to match an interface or base class, so don't check them.
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      // TODO: These aliases are public API, so removing them has to wait until the next major version
      '@angular-eslint/no-input-rename': 'warn',
      '@angular-eslint/no-output-rename': 'warn',
      '@angular-eslint/no-output-on-prefix': 'warn',
    },
  },
  {
    files: ['projects/lib/**/*.ts'],
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
    files: ['projects/demo/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['app', 'demo', 'example'],
          style: 'camelCase',
        },
      ],
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
      // TODO: Semantic UI puts click handlers on plain elements. Needs a rework per component.
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'warn',
    },
  },
);
