const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  webpack(config, { dev }) {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: "eslint-loader"
      });
    }

    // const originalEntry = config.entry;
    // config.entry = async () => {
    //   const entries = await originalEntry();
    //
    //   if (entries["main.js"]) {
    //     entries["main.js"].unshift("./polyfills.js");
    //   }
    //
    //   return entries;
    // };

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};
