var symlinked = require("./")

function ok(message, test) {
  if (test) console.info("Pass: " + message)
  else throw new Error("Fail: " + message)
}

ok(".names return type", Array.isArray(symlinked.names(".")))
ok(".links return type", Array.isArray(symlinked.links(".")))
