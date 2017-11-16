# symlinked
Node utility to list symlinks made by [`npm link`](https://docs.npmjs.com/cli/link), [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/), or [`fs.link`](https://nodejs.org/api/fs.html)

## CLI

### Install via `npm` or `yarn`
```
npm install --global symlinked
```

```
yarn add global symlinked
```

### Usage

```
Usage: symlinked [<path>]

  Finds all linked package names of an npm package.

Options:

  -h, --help     Display this usage info
  -p, --paths    Get linked package paths
  -r, --roots    Get linked package roots
  -l, --links    Get linked package links
```

## API

### Install via `npm` or `yarn`
```
npm install symlinked
```

```
yarn add symlinked
```

### `require`
```js
var symlinked = require("symlinked")
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

### [Webpack `resolve.modules`](https://webpack.js.org/configuration/resolve/#resolve-modules) configuration to resolve dependencies of linked dependencies
```js
module.exports = {
  resolve: {
    modules: ["node_modules"].concat(symlinked.roots())
  }
}
```
