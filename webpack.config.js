const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV === "production" ? "production" : "development",
  devtool: "inline-source-map",
  entry: {
    "service-worker": resolve(__dirname, "./src/service-worker"),
    "scoped-labels": resolve(__dirname, "./src/content-scripts/scoped-labels"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
