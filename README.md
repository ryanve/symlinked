# symlinked


## `npm`
```
npm install symlinked
```

## `yarn`
```
yarn add symlinked
```

### `require`

```js
var symlinked = require("symlinked")
```

## Methods

- `symlinked.names(dir: ".")` get array of linked module names
- `symlinked.paths(dir: ".")` get array of linked module paths
- `symlinked.links(dir: ".")` get array of linked module links
- `symlinked.deps(dir: ".")` get array of linked modules names that are also dependencies
- `symlinked.is(path)` test if path is linked. Will
- `symlinked.read(path)` read link

## Examples

### Ran in package directory with `said` dependency sublinked

```js
symlinked.names()
// [ 'said' ]
```

```js
symlinked.paths()
// [ '/Users/jdoe/symlinked/node_modules/said' ]
```

```js
symlinked.links()
// [ '/Users/said' ]
```

```js
symlinked.deps()
// [ 'said' ]
```
