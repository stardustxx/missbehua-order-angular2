var webpack = require("webpack");

module.exports = {
  "entry": {
    "app": "./app/index.ts"
  },
  "output": {
    "path": __dirname + "/dist",
    "publicPath": "dist/",
    "filename": "bundle.js"
  },
  "devtool": "source-map",
  "plugins": [
    new webpack.ProvidePlugin({
      "$": "jQuery",
      "jQuery": "jQuery"
    })
  ],
  "resolve": {
    extensions: ["", ".js", ".ts"]
  },
  "module": {
    loaders: [{
      test: /\.ts/,
      loaders: ["ts-loader"],
      exclude: /node_modules/
    }]
  }
};