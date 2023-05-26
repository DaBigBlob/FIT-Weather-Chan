const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    main: "./docs/main.ts",
  },
  output: {
    path: path.resolve(__dirname, './docs/'),
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