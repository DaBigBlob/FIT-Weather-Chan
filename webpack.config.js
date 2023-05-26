const path = require('path');

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    main: "./pages/main.ts",
  },
  output: {
    path: path.resolve(__dirname, './pages/'),
    filename: "main.js"
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  }
};