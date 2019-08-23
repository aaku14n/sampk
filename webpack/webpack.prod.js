/**
 * PRODUCTION WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactLoadablePlugin = require("react-loadable/webpack")
  .ReactLoadablePlugin;
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");
const ReactLoadableSSRAddon = require("react-loadable-ssr-addon");

module.exports = require("./webpack.base")({
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), "src/index.js")],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].[hash].chunk.js",
    path: path.join(process.cwd(), "dist")
  },

  // Add production plugins
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      title: "Qualifly",
      template: path.join(process.cwd(), "/public/index.html"),
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new ReactLoadableSSRAddon({
      filename: "../dist/react-loadable-ssr-addon.json"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 3123
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      importScripts: [
        "https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js"
      ],
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: path.join(process.cwd(), "dist/index.html"),
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      // navigateFallbackWhitelist: [/^\/$/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /asset-manifest\.json$/,
        /.br$/,
        /.gz$/
      ]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  }
});
