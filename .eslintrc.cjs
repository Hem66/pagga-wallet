module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    "prettier",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc.cjs', '.tsconfig.json', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-refresh',
    'react',
    'import',
    'prettier'
  ],
  rules: {
    'react-refresh/only-export-components': [
      1,
      { allowConstantExport: true },
    ],

    'prettier/prettier': ["error", { usePrettierrc: true }],

    'import/prefer-default-export': [0],
    'import/no-unresolved': [0],
    'import/named': [0],

    'react/jsx-uses-react': [0],
    'react/react-in-jsx-scope': [0],
    'react/require-default-props': [0],

    '@typescript-eslint/no-unused-vars': [1],
    '@typescript-eslint/ban-types': [2],
    '@typescript-eslint/no-explicit-any': [2],

    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],

    'no-console': [1],
    'no-param-reassign': [2, { props: false }],
    'no-unused-vars': [0],

    'end-of-line': [0],
    'linebreak-style': [0],
  },
}