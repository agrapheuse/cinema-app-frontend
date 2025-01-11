import prettierPlugin from 'eslint-plugin-prettier'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react' // Import react plugin

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'], // Specify file patterns
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json', // Required for TypeScript linting
      },
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
      'react-hooks': reactHooksPlugin,
      react: reactPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier formatting

      'no-unused-vars': 'off',
      //'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-restricted-syntax': ['error', 'WithStatement'],
      'consistent-return': 'error',

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrorsIgnorePattern: '^_',
          args: 'none',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-floating-promises': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-no-duplicate-props': 'error',
      'react/no-unescaped-entities': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      'next.config.mjs',
      'postcss.config.mjs',
      '.next/',
      'next-env.d.ts',
    ], // Ignore specific files
  },
]
