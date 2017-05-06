var symlinked = require("./")

function ok(message, test) {
  if (test) console.info("Pass: " + message)
  else throw new Error("Fail: " + message)
}

ok(".search return type", Array.isArray(symlinked.search()))
ok(".names return type", Array.isArray(symlinked.names()))
ok(".paths return type", Array.isArray(symlinked.paths()))
ok(".links return type", Array.isArray(symlinked.links()))
ok(".is return type", typeof symlinked.is(".") == "boolean")
