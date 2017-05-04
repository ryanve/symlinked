var fs = require("fs")
var path = require("path")
var node_modules = "node_modules"

function search(dir) {
  dir = dir || "."
  var context = path.resolve(dir)
  return fs.existsSync(context) ? fs.readdirSync(context).map(function(basename) {
    var relative = path.join(dir, basename)
    var absolute = path.resolve(relative)
    var stats = fs.lstatSync(absolute)
    var found = {
      name: basename,
      path: relative,
    }
    if (stats.isSymbolicLink()) found.link = path.resolve(fs.readlinkSync(absolute))
    return found
  }) : []
}

function symlinked(dir) {
  return search(dir).filter(function(found) {
    return found.hasOwnProperty("link")
  })
}

symlinked.modules = function(dir) {
  return symlinked(dir ? path.join(dir, node_modules) : node_modules)
}

module.exports = symlinked;
