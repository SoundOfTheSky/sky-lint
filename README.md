# sky-lint
Collection of configs and linters that I use in my projects.

## Installation
1. `git clone`
2. In this folder: `npm link`
3. In your target project: `npm link sky-lint -D`
  
## ESLint
Create `eslint.config.mjs` and put
```js
// @ts-check
import skyEslintConfig from 'sky-lint/eslint.config.mjs';

/** @type {import("typescript-eslint").Config} */
export default [
  ...skyEslintConfig,
];

```
### Features
- Very strict
- TypeScript
- Prettier
- Unused imports
- Unicorn

## TSConfig
Create `tsconfig.json` and put 
```json
{
  "extends": "sky-lint/tsconfig.json"
}
```
### Features:
- Latest syntax support (no transposing)
- `./src` is base directory
- `@/...` to reference root

## Prettier
Create `prettier.config.mjs` and put
```js
// @ts-check
import skyPrettierConfig from 'sky-lint/prettier.config.mjs';

/** @type {import("prettier").Config} */
export default {...skyPrettierConfig};

```
### Features:
- Developer expirience is more important than older browser support
- Single quote

## Stylelint
Create `stylelint.config.mjs` and put
```js
// @ts-check

/** @type {import("stylelint").Config} */
export default {
  extends: ['sky-lint/stylelint.config.mjs'],
};
```
### Features
- Prettier
- SCSS
- High performance animation
- Ordering
  
  