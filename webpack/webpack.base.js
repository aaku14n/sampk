/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = options => ({
  entry: options.entry,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            require("@babel/plugin-proposal-class-properties"),
            require("@babel/plugin-proposal-object-rest-spread"),
            require("@babel/plugin-syntax-dynamic-import"),
            require("react-loadable/babel"),
            require("@babel/plugin-transform-runtime")
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          minChunks: 1,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: options.output,
  devServer: options.devServer ? options.devServer : {},
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: "exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd"
    }),
    new webpack.NamedModulesPlugin(),
    // clearing dist folder before making new build
    new CleanWebpackPlugin([path.join(process.cwd(), "/dist")], {
      root: process.cwd()
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name]-[hash].css"
    })
  ]),
  devtool: options.devtool,
  target: "web", // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {}
});
