// @ts-check

import eslint from '@eslint/js';
import StylisticPlugin from '@stylistic/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  StylisticPlugin.configs['disable-legacy'],
  StylisticPlugin.configs['recommended-flat'],
  eslintPluginUnicorn.configs['flat/recommended'],
  jsxA11y.flatConfigs.strict,
  // @ts-ignore
  importPlugin.flatConfigs.recommended,
  // @ts-ignore
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': [2, 'type'], // Types are easier to manage
      '@typescript-eslint/explicit-member-accessibility': 1, // provide access modifiers
      '@typescript-eslint/no-misused-promises': 0, // Some callbacks ignore return type
      '@typescript-eslint/no-non-null-assertion': 0, // TS isn't smart enough to enable this
      '@typescript-eslint/prefer-for-of': 0, // for of is hella slow
      '@typescript-eslint/restrict-template-expressions': [
        1,
        {
          allowNumber: true,
        },
      ], // number is easily converted to string
      '@typescript-eslint/restrict-plus-operands': [
        1,
        {
          allowNumberAndString: true,
        },
      ], // number is easily converted to string

      'unused-imports/no-unused-imports': 1,
      'unused-imports/no-unused-vars': [
        1,
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'prettier/prettier': [
        1,
        {
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'all',
        },
      ],

      'jsx-a11y/media-has-caption': 0, // Sometimes sound is just a sound but I belive that this is useful

      'import/prefer-default-export': 1,
      'import/order': [
        1,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: './**.scss',
              group: 'object',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'import/newline-after-import': 1,
      'import/first': 1,

      'unicorn/prefer-math-trunc': 0, // ~~ Is faster than Math.trunk (in Firefox and Safari)
      /**
       * Standart for loop is insanely faster than for of.
       * For of uses iterators to loop, which is a significant overhead.
       */
      'unicorn/no-for-loop': 0,
    },
  },
);
