#!/usr/bin/env node

var symlinked = require("./")

var help = false
var dashdash = false
var error = null
var flags = []

var args = process.argv.slice(2).filter(function(arg) {
  if (dashdash)
    return !!arg
  else if (arg === "--")
    dashdash = true
  else if (arg === "--paths" || arg === "-p")
    flags.push("paths")
  else if (arg === "--roots" || arg === "-r")
    flags.push("roots")
  else if (arg === "--links" || arg === "-l")
    flags.push("links")
  else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
    help = true
  else if (arg.match(/^-/))
    error = "Unknown flag: " + arg
  else
    return !!arg
})

if (help || args.length > 1 || flags.length > 1 || error) {
  // If they didn't ask for help, then this is not a "success"
  var log = help ? console.log : console.error
  log("Usage: symlinked [<path>]")
  log("")
  log("  Finds all linked package names of an npm package.")
  log("")
  if (error) {
    log("  " + error)
    log("")
  }
  if (flags.length > 1) {
    log("  Maximum of one flag may be passed at a time. Received: " + JSON.stringify(flags))
    log("")
  }
  log("Options:")
  log("")
  log("  -h, --help     Display this usage info")
  log("  -p, --paths    Get linked package paths")
  log("  -r, --roots    Get linked package roots")
  log("  -l, --links    Get linked package links")
  process.exit(help ? 0 : 1)
} else
  go(args[0] || ".")

function go (dir) {
  var exec = symlinked[flags[0] || "names"]
  var results = exec(dir)
  for (var i = 0; i < results.length; i++) {
      console.log(results[i])
  }
}