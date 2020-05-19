const Dotenv = require("dotenv-webpack");
const path = require("path");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  webpack(config, { dev }) {
    //this will drive you nuts - run it on a hook or make the PR fail
    // if (dev) {
    //   config.module.rules.push({
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: "eslint-loader"
    //   });
    // }

    config.node = {
      fs: "empty"
    };

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
      new MomentLocalesPlugin(),
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};
