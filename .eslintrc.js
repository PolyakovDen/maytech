module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  plugins: ['vue'],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    eqeqeq: 0,
    'no-new': 0,
    'vue/experimental-script-setup-vars': 0
  },
};
