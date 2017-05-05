var fs = require("fs")
var path = require("path")
var node_modules = "node_modules"

function Found() {}

function search(dir) {
  dir = dir || "."
  var context = path.resolve(dir)
  if (!fs.existsSync(context)) return []
  var contents = fs.readdirSync(context)
  return contents.map(function(name) {
    var relative = path.join(dir, name)
    var found = new Found
    found.name = name
    if (is(relative)) found.link = read(relative)
    return found
  })
}

function read(p) {
  return path.resolve(fs.readlinkSync(path.resolve(p)))
}

function pluck(found) {
  return found[this]
}

function modules(dir) {
  return path.join(dir || ".", node_modules)
}

function names(dir) {
  return search(modules(dir)).filter(is).map(pluck, "name")
}

function links(dir) {
  return search(modules(dir)).filter(is).map(pluck, "link")
}

function is(p) {
  if (p instanceof Found) return p.hasOwnProperty("link")
  if (!fs.existsSync(p)) throw new Error("Path must exist in order to test if it is symlinked. Path " + p + " does not exist. You may need to first run: npm install")
  return fs.lstatSync(p).isSymbolicLink()
}

function deps(dir) {
  dir = dir || "."
  var pkg = JSON.parse(fs.readFileSync(path.resolve(dir, "package.json")))
  return [].concat.apply([], [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies"
  ].map(function(type) {
    if (!pkg[type]) return []
    return Object.keys(pkg[type]).filter(function(dep) {
      return is(path.join(node_modules, dep))
    })
  }))
}

module.exports = {
  deps: deps,
  links: links,
  names: names,
  read: read,
  is: is,
  search: search
};
