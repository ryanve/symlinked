# symlinked

```js
var symlinked = require("symlinked")
```

- `symlinked.names(dir: ".")` get array of linked module names
- `symlinked.links(dir: ".")` get array of linked modules paths
- `symlinked.deps(dir: ".")` get array of linked modules names that are dependencies
- `symlinked.is(path)` test if path is linked
- `symlinked.read(path)` read link
