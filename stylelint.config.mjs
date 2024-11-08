// @ts-check

/** @type {import('stylelint').Config} */
export default {
  plugins: [
    'stylelint-prettier',
    'stylelint-high-performance-animation',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    'stylelint-config-hudochenkov/full',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'prettier/prettier': [
      true,
      {
        severity: 'warning',
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'all',
      },
    ],
    'selector-max-type': null,
    'selector-no-qualifying-type': null,
    'plugin/no-low-performance-animation-properties': [
      true,
      {
        ignore: 'paint-properties',
      },
    ],
    'plugin/declaration-block-no-ignored-properties': true,
  },
};
