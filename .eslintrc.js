module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint',],
  rules: {
    quotes: ['error', 'single',],
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'no-multi-spaces': 'off',
    // 'no-unused-vars': [
    //   'error',
    //   { vars: 'all', args: 'after-used', ignoreRestSiblings: false, },
    // ],
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2
      },
      multiline: {
        max: 1
      }
    }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below'
    }],
    camelcase: 'off',
    'import/order': 'off',
    'require-await': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-v-html': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off'
  },
};
