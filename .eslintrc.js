module.exports = {
  root: true,
  env: {
    'node': true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  plugins: ['vuetify'],
  parserOptions: {
    'parser': '@babel/eslint-parser'
  },
  rules: {
    indent: 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': 1,
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
    'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
    'vue/no-parsing-error': ['error', { 'invalid-first-character-of-tag-name': false }], // invalid-first-character-of-tag-name https://github.com/vuejs/eslint-plugin-vue/issues/370
    'no-case-declarations': 'off',
    'no-dupe-class-members': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true
    }]
  }
}
