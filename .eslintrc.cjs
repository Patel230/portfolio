module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 'prettier' must come last: it turns off ESLint formatting rules that conflict
  // with Prettier (e.g. vue/max-attributes-per-line), so the two don't fight.
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    __APP_VERSION__: 'readonly'
  }
}
