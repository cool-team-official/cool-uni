## postcss-urlrewrite [![Build Status](https://secure.travis-ci.org/iAdramelk/postcss-urlrewrite.png)](https://travis-ci.org/iAdramelk/postcss-urlrewrite)

> PostCSS plugin for easy url() rewriting.

### Getting Started


```shell
npm install postcss-urlrewrite
```

### Example

Usage example:

```javascript
// dependencies
var fs = require( 'fs' );
var postcss = require( 'postcss' );
var urlrewrite = require( 'postcss-urlrewrite' );

// css to be processed
var css = fs.readFileSync( 'build/build.css', 'utf8' );

// config for urlrewrite
var config = {
    imports: true,
    properties: [ 'background', 'content' ],
    rules: [
        { from: \local\, to: 'global' },
        { from: \local2\, to: 'global2' }
    ]
};

// process css using postcss-urlrewrite
var out = postcss()
   .use( urlrewrite( config ) )
   .process( css )
   .css;
```

### Configuration

#### imports

**Type**: boolean
**Default**: false

If set to true will replace urls in **@import** at-rules.

#### properties

**Type**: array or boolean
**Default**: true

List of css-properties to replace. If set to true, will work with all
properties. If set to array will work only with the properties in the list.

#### rules

**Type**: array of objects or function

There is to way to set rules:

1. Create array of objects with "from" and "to" keys. "from" can be **String** or **RegExp**, "to" can be **String** or **Function**. See [String.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) syntax for details. ONLY first matching rule will be triggered on each URI.
2. Create function that will work with [URIjs](http://medialize.github.io/URI.js/) objects and mutate them one way or another.
