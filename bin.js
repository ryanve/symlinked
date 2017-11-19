#!/usr/bin/env node

var symlinked = require("./")

var help = false
var dashdash = false

var args = process.argv.slice(2).filter(function(arg) {
  if (dashdash)
    return !!arg
  else if (arg === "--")
    dashdash = true
  else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
    help = true
  else
    return !!arg
})

var argsOk = args.length >= 1 && args.length <= 2 && Object.keys(symlinked).indexOf(args[0]) !== -1

if (help || !argsOk) {
  // If they didn't ask for help, then this is not a "success"
  var log = help ? console.log : console.error
  log("Usage: symlinked <command> [<path>]")
  log("")
  log("  Finds all linked package names of an npm package.")
  log("")
  if (!help && !argsOk) {
    log("  Invalid arguments received.")
    log("")
  }
  log("Commands:")
  log("")
  log("  names    Get linked package names")
  log("  paths    Get linked package paths")
  log("  roots    Get linked package roots")
  log("  links    Get linked package links")
  log("")
  log("Options:")
  log("")
  log("  -h, --help     Display this usage info")
  process.exit(help ? 0 : 1)
} else
  go(args[0], args[1] || ".")

function go (command, dir) {
  var results = symlinked[command](dir)
  for (var i = 0; i < results.length; i++) {
    console.log(results[i])
  }
}