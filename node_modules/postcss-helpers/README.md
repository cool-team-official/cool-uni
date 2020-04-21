## postcss-helpers [![Build Status](https://secure.travis-ci.org/iAdramelk/postcss-helpers.png)](https://travis-ci.org/iAdramelk/postcss-helpers)

> Some general purpose helpers for PostCSS, created to make working with url() and @import values more easy. Can be used without PostCSS.

### Getting Started


```shell
npm install postcss-helpers
```


### Helpers

#### #createUrlsHelper( rule )

Returns new UrlsHelper object from the rule string with one or more url() (see description below).

#### #createImportHelper( rule )

Returns new ImportHelper object from the @import value string (see description below).


### new UrlsHelper( rule )

Object for manipulating values of rules with one or multiple url().

#### #getOriginalRule

Returns original rule that it was created with.

#### #getOriginalURIS

Returns Array of all original URI in string. NOT mutated URIs.

#### #URIS

Array of one or more [urijs](http://medialize.github.io/URI.js/) objects that can be used for URI manipulations.  If there is no url() in the rule returns false.

For example you can use UrlsHelper.URIS[0].href() to get value for the first url() and UrlsHelper.URIS[0].href('new_uri') to set new URI value. See [full documentation](http://medialize.github.io/URI.js/docs.html).

#### #getModifiedRule

After you finished changing values of the URIS you can get modified rule text with this command.


### new ImportHelper( rule )

Object for manipulating values of @import at-rules.

#### #getOriginalRule

Returns original rule that it was created with.

#### #getOriginalURI

Returns original URI from string. NOT mutated URI.

#### #URI

[urijs](http://medialize.github.io/URI.js/) objects that can be used for URI manipulations. If there is no url() in the rule returns false.

For example you can use ImportHelper.URI.href() to get import value and ImportHelper.URI.href('new_uri') to set new URI value. See [full documentation](http://medialize.github.io/URI.js/docs.html).

#### #getModifiedRule

After you finished changing values of the URI you can get modified rule text with this command.

#### #getOriginalMediaQuery

Returns media query from original string.

#### #setMediaQuery( query )

Replace old media query or creates new one.

#### #getMediaQuery

Returns current media query from string.


### Other

#### #regexp

Collection of some useful RegExps based on CSS specification grammar rules: http://www.w3.org/TR/CSS21/grammar.html

  - STRINGS – RegExp for css &lt;string&gt; with 'ig' flags.
  - URLS – RegExp for css &lt;uri&gt; with 'ig' flags.


### Examples

Modify string with multiple url() fragments:

```javascript
var helpers = require( 'postcss-helpers' );

var rule = 'url(logo1.png)', url( 'logo2.png' ), url( "logo3.png");

var helper = helpers.createUrlsHelper( rule );

helper.URIS.forEach( function( uri ) {
    uri.suffix( 'jpeg' );
} );

var modifiedRule = helper.getModifiedRule(); // url(logo1.jpeg)', url( 'logo2.jpeg' ), url( "logo3.jpeg")
```

Modify @import value:

```javascript
var helpers = require( 'postcss-helpers' );

var rule = '"src/print.css" print';

var helper = helpers.createImportHelper( rule );

helper.URI.directory( 'dist' );
helper.getMediaQuery(); // print
helper.setMediaQuery( 'screen' );

var modifiedRule = helper.getModifiedRule(); // "dist/print.css" screen
```

Test if string contains url() fragments:

```javascript
var helpers = require( 'postcss-helpers' );

var rule = 'url(logo1.png)', url( 'logo2.png' ), url( "logo3.png");

helpers.regexp.URIS.test( rule ); // true
```


### Known problems

UrlsHelper() and ImportHelper() will not escape quotes in the new URI values so escape them yourself.


### Release History

See [CHANGELOG](/CHANGELOG) for detailed changes.

 * 2014-08-08   0.1.0   Initial release.
 * 2014-08-11   0.1.1   Make RegExps public. Fixed ?#iefix bug.
 * 2014-08-12   0.2.0   Added methods for getting original url() values and for media query manipulations.
