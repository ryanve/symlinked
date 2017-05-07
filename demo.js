var symlinked = require("./")
var path = require("path")
var said = require("said")

console.log("CONTEXT")
console.log(path.resolve("."))
console.log()

console.log("npm root -g")
console.log(said("npm root -g"))
console.log()

console.log("NAMES")
console.log(symlinked.names())
console.log()

console.log("PATHS")
console.log(symlinked.paths())
console.log()

console.log("ROOTS")
console.log(symlinked.roots())
console.log()

console.log("LINKS")
console.log(symlinked.links())
console.log()

console.log("MAP")
console.log(symlinked.paths().map(symlinked.read))
console.log()
