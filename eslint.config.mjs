// @ts-check

import eslint from '@eslint/js'
import StylisticPlugin from '@stylistic/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginImportX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default baseSeverityOnFixability(
  tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    StylisticPlugin.configs['disable-legacy'],
    StylisticPlugin.configs['recommended-flat'],
    eslintPluginUnicorn.configs['flat/recommended'],
    jsxA11y.flatConfigs.strict,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
      files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
      ignores: ['eslint.config.mjs'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser,
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
        /**
         * Standart for loop is insanely faster than for of.
         * For of uses iterators to loop, which is a significant overhead.
         */
        '@typescript-eslint/prefer-for-of': 0,
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

        'jsx-a11y/media-has-caption': 0, // Sometimes sound is just a sound but I belive that this is useful

        'import-x/prefer-default-export': 1,
        'import-x/order': [
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
        'import-x/newline-after-import': 1,
        'import-x/first': 1,
        'import-x/no-dynamic-require': 'warn',
        'import-x/no-nodejs-modules': 'warn',

        'unicorn/prefer-math-trunc': 0, // ~~ Is faster than Math.trunk (in Firefox and Safari)
        /**
         * Standart for loop is insanely faster than for of.
         * For of uses iterators to loop, which is a significant overhead.
         */
        'unicorn/no-for-loop': 0,
      },
    },
  ),
)

function baseSeverityOnFixability(configs) {
  const plugins = {}
  for (const config of configs)
    for (const name in config.plugins) plugins[name] = config.plugins[name]
  for (const config of configs) {
    if (!config.rules) continue
    for (const ruleName in config.rules) {
      const slashIndex = ruleName.indexOf('/')
      const pluginName =
        slashIndex === -1 ? 'eslint' : ruleName.slice(0, slashIndex)
      const pluginRuleName =
        slashIndex === -1 ? ruleName : ruleName.slice(slashIndex + 1)
      const severity = plugins[pluginName]?.rules?.[pluginRuleName]?.meta
        ?.fixable
        ? 1
        : 2
      const rule = config.rules[ruleName]
      if (Array.isArray(rule) && rule[0] !== 'off' && rule[0] !== 0)
        rule[0] = severity
      else if (rule !== 'off' && rule !== 0)
        config.rules = { ...config.rules, [ruleName]: severity }
    }
  }
  return configs
}
