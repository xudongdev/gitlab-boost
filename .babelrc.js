const { NODE_ENV } = process.env;

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        corejs: 3,
        useBuiltIns: "usage",
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/proposal-class-properties",
    [
      "babel-plugin-styled-components",
      {
        displayName: NODE_ENV === "development",
      },
    ],
  ],
};
