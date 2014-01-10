/*!
 * stylus-fn
 * Copyright (c) 2014 Stephen King <stephen.brian.king@gmail.com>
 * MIT Licensed
 */

var stylus = require("stylus"),
  path = require("path"),
  nodes = stylus.nodes,
  utils = stylus.utils,
  package = require(path.join(__dirname, "../package.json")),
  plugin;

var plugin = function() {
  return function(style) {
    style.include(__dirname);
  };
};

plugin.version = package.version;
plugin.path = __dirname;

module.exports = plugin;