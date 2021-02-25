import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

const port = 4004;
const publicPath = `http://localhost:${port}/`;
const remoteHost = "http://localhost:4000";

const config: webpack.Configuration = {
  mode: "development",
  output: {
    publicPath: "http://localhost:4004/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "clientApp",
      library: { type: "var", name: "clientApp" },
      filename: "remoteEntry.js",
      remotes: {
        "@allocate-shared": "hostApp",
      },
      exposes: {},
      shared: [],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  //devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: port,
    open: true,
    hot: true,
  },
};

export default config;
