module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false// Parsing error: No Babel config file detected for C:\Users\XXXX\About.vue. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.eslint
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/multi-word-component-names":"off",//Component name “index“ should always be multi-word.eslintvue/multi-word-component-names

  }
}
