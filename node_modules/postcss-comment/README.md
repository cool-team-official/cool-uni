# postcss-comment
[![version](https://img.shields.io/npm/v/postcss-comment.svg)](https://www.npmjs.org/package/postcss-comment)
[![status](https://travis-ci.org/zoubin/postcss-comment.svg?branch=master)](https://travis-ci.org/zoubin/postcss-comment)
[![dependencies](https://david-dm.org/zoubin/postcss-comment.svg)](https://david-dm.org/zoubin/postcss-comment)
[![devDependencies](https://david-dm.org/zoubin/postcss-comment/dev-status.svg)](https://david-dm.org/zoubin/postcss-comment#info=devDependencies)

Allow postcss to support inline comments.

## Usage

```bash
npm i --save-dev postcss postcss-comment

```

### As parser

```javascript
var postcss = require('postcss')
var parser = require('postcss-comment')

var fs = require('fs')

var file = __dirname + '/inline.css'

postcss()
  .process(
    fs.readFileSync(file, 'utf8'),
    { from: file, parser: parser }
  )
  .then(function (result) {
    console.log(result.css)
  })

```

### Hook require
```javascript
require('postcss-comment/hookRequire')
var postcss = require('postcss')

var fs = require('fs')

var file = __dirname + '/inline.css'

postcss()
  .process(
    fs.readFileSync(file, 'utf8'),
    { from: file }
  )
  .then(function (result) {
    console.log(result.css)
  })

```

Or:
```javascript
var postcss = require('postcss-comment/hookRequire')

var fs = require('fs')

var file = __dirname + '/inline.css'

postcss()
  .process(
    fs.readFileSync(file, 'utf8'),
    { from: file }
  )
  .then(function (result) {
    console.log(result.css)
  })

```


## Example

inline.css:
```css
/*
 * comments//
 * //comments
 */
// comments
//* comments*/
.inline-comment { /// comments
  // com//ments
  color: red; // comments
} // /*comments
//*/ comments

```

outputs:
```css
/*
 * comments//
 * //comments
 */
/* comments */
/** comments*\/ */
.inline-comment { /*\/ comments */
  /* com//ments */
  color: red; /* comments */
} /* /*comments */
/**\/ comments */

```
