import path from 'node:path';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import airbnb from 'eslint-config-airbnb-extended/legacy';
import { rules } from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

const gitignorePath = path.resolve('.', '.gitignore');
const airbnbConfig = [
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  ...airbnb.configs.base.recommended,
];
const prettierConfig = [
  {
    name: 'prettier/config',
    plugins: {
      prettier,
    },
    rules: {
      ...rules,
      'prettier/prettier': 'error',
    },
  },
];
const extendsConfig = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];

export default defineConfig([
  ...airbnbConfig,
  ...prettierConfig,
  ...extendsConfig,
  includeIgnoreFile(gitignorePath),
]);
