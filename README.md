# keysort

Sorts an Array of Objects based on key values, like an SQL `ORDER BY`

[![build status](https://secure.travis-ci.org/avoidwork/keysort.png)](http://travis-ci.org/avoidwork/keysort)

**Example**

```javascript
var arr = [{abc: 123124, xyz: 5}, {abc: 123125, xyz: 6}, {abc: 2, xyz: 5}];

keysort(arr, "abc, xyz"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 5}, {abc: 123125, xyz: 6}];
keysort(arr, "abc, xyz desc"); // [{abc: 2, xyz: 5}, {abc: 123125, xyz: 6}, {abc: 123124, xyz: 5}];
```

## What is Supported?

* AMD loaders (require.js, cujo.js, etc.)
* node.js (npm install keysort)
* script tag

## License
Copyright (c) 2017 Jason Mulligan  
Licensed under the BSD-3 license.