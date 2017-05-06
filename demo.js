var symlinked = require("./")
var path = require("path")
var cp = require("child_process")
var root = String(cp.execSync("npm root -g")).trim()

console.log("DIR")
console.log(path.resolve("."))
console.log()

console.log("ROOT")
console.log(root)
console.log()

console.log("NAMES")
console.log(symlinked.names())
console.log()

console.log("PATHS")
console.log(symlinked.paths())
console.log()

console.log("LINKS")
console.log(symlinked.links())
console.log()

console.log("DEPS")
console.log(symlinked.deps())
console.log()
