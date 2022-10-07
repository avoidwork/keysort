# keysort

Sorts an Array of Objects with SQL ORDER BY clause.

**Example**

```javascript
import {keysort} from "keysort";
const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

keysort(arr, "abc, xyz"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}];
keysort(arr, "abc, xyz desc"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 123124, xyz: 5}];
```

## License
Copyright (c) 2022 Jason Mulligan  
Licensed under the BSD-3 license.
