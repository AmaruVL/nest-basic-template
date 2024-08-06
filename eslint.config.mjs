// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import configPrettier from 'eslint-config-prettier'

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,
  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
    },
  },
)
