# symlinked
Node utility to list symlinks made by [`npm link`](https://docs.npmjs.com/cli/link), [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/), or [`fs.link`](https://nodejs.org/api/fs.html). It will also recursively search in linked packages and display it as a nice tree output.

## Install

```
npm install symlinked
```

Local install as above is best practice if you are using in a shared codebase because then all developers will use the same version. CLI can be used locally via npx or via npm scripts. `npm install` has a `--global` flag you can add if you prefer global use. Yarn can be used via `yarn add` and `yarn global add` respectively if you prefer yarn.

## CLI

```
Usage: symlinked <command> [<path>]

  Finds all linked package names of an npm package.

Commands:

  names    Get linked package names
  paths    Get linked package paths
  roots    Get linked package roots
  links    Get linked package links

Options:

  -h, --help     Display this usage info
```

### CLI example

<pre>
<b># Link some packages for example</b>
$ npm link @songkick/promise-retry
$ npm link eol
// let's assume we link package 'deeper' in promise-retry.
$ npm link deeper

<b>$ symlinked names</b>
    ┣━─@songkick/promise-retry
    │   ┣━─deeper
    ┗━─eol

<b>$ symlinked paths</b>
    ┣━─/Users/doe/project/node_modules/@songkick/promise-retry
    │   ┣━─/Users/doe/project/node_modules/@songkick/promise-retry/node_modules/deeper
    ┗━─/Users/doe/project/node_modules/eol

<b>$ symlinked roots</b>
    ┣━─/Users/doe/project/node_modules/@songkick/promise-retry/node_modules
    │   ┣━─/Users/doe/project/node_modules/@songkick/promise-retry/node_modules/deeper/node_modules
    ┗━─/Users/doe/project/node_modules/eol/node_modules

<b>$ symlinked links</b>
    ┣━─/usr/local/lib/node_modules/@songkick/promise-retry
    │   ┣━─/usr/local/lib/node_modules/@songkick/promise-retry/node_modules/deeper
    ┗━─/usr/local/lib/node_modules/eol
</pre>

## API

### `require`
```js
const symlinked = require("symlinked")
```

### Methods
- `symlinked.names(dir: ".")` get array of linked package names
- `symlinked.paths(dir: ".")` get array of linked package paths
- `symlinked.roots(dir: ".")` get array of linked package roots
- `symlinked.links(dir: ".")` get array of linked package links
- `symlinked.is(path)` test if path exists and is linked
- `symlinked.read(path)` read link

### Examples
#### Ran in package directory with `said` dependency linked on both ends
```js
symlinked.names()
// [ 'said' ]
```

```js
symlinked.paths()
// [ '/Users/jdoe/symlinked/node_modules/said' ]
```

```js
symlinked.roots()
// [ '/Users/jdoe/symlinked/node_modules/said/node_modules' ]
```

```js
symlinked.links()
// [ '/Users/said' ]
```

## Webpack
### [`resolve.modules`](https://webpack.js.org/configuration/resolve/#resolve-modules) configuration to resolve dependencies of linked dependencies

```js
module.exports = {
  resolve: {
    modules: ["node_modules"].concat(symlinked.roots())
  }
}
```

# Author:
#### "Ryan Van Etten"

# Contributors:
#### "Cole Chamberlain"
#### "Emmanuel Mahuni"
