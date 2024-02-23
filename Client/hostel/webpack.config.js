const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  // Other webpack configurations...
};
