import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'] },
  ...astro.configs['flat/recommended'],
  { files: ['**/*.ts'], languageOptions: { parser: tsParser }, plugins: { '@typescript-eslint': tsPlugin }, rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
  { files: ['**/*.astro'], languageOptions: { parserOptions: { parser: tsParser } } },
];
