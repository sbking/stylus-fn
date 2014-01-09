var fs = require("fs"),
  path = require("path"),
  glob = require("glob"),
  should = require("chai").should(),
  css = require("css"),
  stylus = require("stylus"),
  fn = require("../"),
  tests;

css.normalize = function(path) {
  return css.stringify(css.parse(path), {
    compress: true
  });
};

tests = glob.sync("test/cases/**/*.styl").map(function(filePath) {
  return {
    name: path.basename(filePath, ".styl"),
    path: path.dirname(filePath)
  };
});

describe("fn", function() {
  tests.forEach(function(test) {
    var name = test.name.replace(/[-.]/g, " ");
    it(name, function() {
      var stylPath = path.join(test.path, test.name + ".styl"),
        cssPath = path.join(test.path, test.name + ".css"),
        expected = css.normalize(fs.readFileSync(cssPath, "utf8"));

      stylus(fs.readFileSync(stylPath, "utf8"))
        .use(fn)
        .set("filename", stylPath)
        .define("url", stylus.url())
        .render(function(err, compiled) {
          if (err) throw err;
          var actual = css.normalize(compiled);
          actual.should.equal(expected);
        });
    });
  });
});