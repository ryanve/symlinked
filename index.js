var fs = require("fs")
var path = require("path")
var node_modules = "node_modules"

function Found() {}

function search(dir) {
  dir = dir || "."
  var context = path.resolve(dir)
  if (!fs.existsSync(context)) return []
  var contents = fs.readdirSync(context)
  var scopedRoots = []
  var results = contents.filter(function (name) {
    var isBin = name === ".bin"
    var isScoped = name.charAt(0) === "@"
    if (isScoped) scopedRoots.push(path.join(dir, name))
    return !isScoped && !isBin
  }).map(function(name) {
    var relative = path.join(dir, name)
    var found = new Found
    found.name = name
    found.path = path.resolve(relative)
    if (is(relative)) found.link = read(relative)
    return found
  })
  return scopedRoots.reduce(function (_, scopedRoot) {
    return _.concat(search(scopedRoot))
  }, results)
}

function read(p) {
  return path.resolve(fs.readlinkSync(path.resolve(p)))
}

function pluck(found) {
  return found[this]
}

function root(dir) {
  return path.join(dir || ".", node_modules)
}

function recursiveRoots(dir) {
  var baseRoot = root(dir)
}

function roots(dir) {
  return paths(dir).map(root)
}

function names(dir) {
  return search(root(dir)).filter(is).map(pluck, "name")
}

function paths(dir) {
  return search(root(dir)).filter(is).map(pluck, "path")
}

function links(dir) {
  return search(root(dir)).filter(is).map(pluck, "link")
}

function is(p) {
  if (p instanceof Found) return p.hasOwnProperty("link")
  return fs.existsSync(p) && fs.lstatSync(p).isSymbolicLink()
}

module.exports = {
  links: links,
  names: names,
  paths: paths,
  roots: roots,
  read: read,
  is: is,
  search: search
};
