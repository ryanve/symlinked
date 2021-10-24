var fs = require("fs")
var path = require("path")
var node_modules = "node_modules"

function Found() {}

function search(dir, scope, level) {
  dir = dir || "."
  level = level || 1
  var context = path.resolve(dir)
  if (!fs.existsSync(context)) return []
  var contents = fs.readdirSync(context)
  return contents.reduce(function (accumulated, name) {
    var relative = path.join(dir, name)
    var isScoped = name.charAt(0) === "@"
    if (isScoped) return accumulated.concat(search(relative, name))
    var found = new Found
    found.level = level
    found.name = scope ? scope + "/" + name : name
    found.path = path.resolve(relative)
    if (scope) found.scope = scope
    if (is(relative)) found.link = read(relative)
    accumulated.push(found)
    if(is(relative)) {
      accumulated = accumulated.concat(search(path.join(relative, node_modules), undefined, level + 1))
    }
    return accumulated
  }, [])
}

function read(p) {
  return path.resolve(fs.readlinkSync(path.resolve(p)))
}

function pluck(found, i, list) {
  var t = list.length -1 === i || list[i+1].level !== found.level ? "└──" : "├──"
  return " ".repeat(found.level * 4) + "\x1b[2m" + t + "\x1b[0m" + found[this]
}

function root(dir) {
  return path.join(dir || ".", node_modules)
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
