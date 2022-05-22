var path = require("path");
var fs = require("fs");
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, "node_modules"))
  .filter((x) => [".bin"].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  name: "server",
  target: "node",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
    filename: "index.js",
  },
  externals: nodeModules,
};
