var symlinked = require("./")
var isArrayOf = require("is-array-of")
var isStrings = isArrayOf("string")
var isObjects = isArrayOf("object")

function ok(message, test) {
  if (test) console.info("Pass: " + message)
  else throw new Error("Fail: " + message)
}

ok(".search return type", isObjects(symlinked.search()))
ok(".names return type", isStrings(symlinked.names()))
ok(".paths return type", isStrings(symlinked.paths()))
ok(".links return type", isStrings(symlinked.links()))
ok(".deps return type", isStrings(symlinked.links()))
ok(".is return type", typeof symlinked.is(".") == "boolean")

console.log("All tests passed =)")
