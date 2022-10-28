module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: 'google',
  env: {
    node: true,
    es6: true,
  },
  rules: {
    arraysInObjects: true,
    allowArrowFunctions: true,
    'object-curly-spacing': [2, 'always'],
    indent: ['error', 2],
  },
};
