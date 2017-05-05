var symlinked = require("./")
var path = require("path")
var cp = require("child_process")
var root = String(cp.execSync("npm root -g")).trim()

console.log(root, "is root")
console.log(path.resolve(root), "is root resolved")
console.log("symlinked.names()", symlinked.names())
console.log("symlinked.links()", symlinked.links())
console.log("symlinked.deps()", symlinked.deps())
