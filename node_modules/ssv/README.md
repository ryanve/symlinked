# ssv
JavaScript SSV (space-separated value) utility module

```sh
npm install ssv --save
```

## Usage

```js
var ssv = require('ssv')

ssv.has('mark tom travis', 'matt') // false
ssv.has('mark tom travis', 'mark') // true
ssv.remove('mark tom travis', 'tom') // 'mark travis'
ssv.add('mark travis', 'matt') // 'mark travis matt'
ssv.add('mark travis', 'travis') // 'mark travis'
ssv.push('mark travis', 'travis') // 'mark travis travis'
ssv.compact('  mark   travis   matt ') // 'mark travis matt'
ssv.parse('mark tom travis') // ['mark', 'tom', 'travis']
```

## API

### ssv.has(SSV, value)
Test if <var>SSV</var> string contains <var>value</var>

### ssv.remove(SSV, value)
Remove all instances of <var>value</var> from <var>SSV</var> string

### ssv.add(SSV, value)
Add <var>value</var> to <var>SSV</var> string if unique

### ssv.push(SSV, value)
Add <var>value</var> to <var>SSV</var> string whether unique or not

### ssv.compact(SSV)
Normalize <var>SSV</var> string to a trim compact string

### ssv.parse(SSV)
Get array of values

## License
MIT
