module.exports = {
  globals: {
    graphql: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true, // this will rarely, if ever, be used by consumers
    sourceType: "module",
  },
  extends: `react-app`,
  plugins: [],
  rules: {
    "import/no-webpack-loader-syntax": [0],
  },
}
