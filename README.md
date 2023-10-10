# keysort

Sorts an Array of Objects with SQL ORDER BY clause syntax.

## Using the module

```javascript
import {keysort} from "keysort";
const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

keysort(arr, "abc, xyz"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}];
keysort(arr, "abc, xyz desc"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 123124, xyz: 5}];
```

## Testing

keysort has 100% code coverage with its tests.

```console
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |     100 |       80 |     100 |     100 |                  
 keysort.cjs |     100 |       80 |     100 |     100 | 25               
-------------|---------|----------|---------|---------|-------------------
```

## API

### keysort(arr = [], order = "", toSorted = false)

Sorts an `Array` of `Objects` with SQL ORDER BY clause syntax. If `toSorted` is `true`, a new sorted `Array` is returned.

## License
Copyright (c) 2023 Jason Mulligan  
Licensed under the BSD-3 license.
