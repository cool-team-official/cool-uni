/*global describe, it */
'use strict';

var fs         = require( 'fs' );
var assert     = require( 'assert' );
var postcss    = require( 'postcss' );
var urlrewrite = require( '../index.js' );

var fixture = function ( name ) {
    return fs.readFileSync( 'test/fixtures/' + name + '.css', 'utf8' ).trim();
};

var compareFixtures = function ( name, options ) {
    var actual = postcss( urlrewrite( options ) ).process( fixture( name ) ).css.trim();
    var expected = fixture( name + '.out' );
    return assert.equal( actual, expected );
};

describe( 'postcss-urlrewrite', function() {
    describe( 'paths in absolute rules', function() {
        it( 'should be replaced', function() {
            var config = {
                rules: [
                    { from: 'http://www.google.com/', 'to': 'http://yandex.ru/' },
                    { from: /^\//, to: 'http://mysite.com/' }
                ]
            };

            compareFixtures( 'absolute', config );
        });
    });

    describe( 'different file types', function() {
        it( 'should return must not affect replacement', function() {
            var config = {
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'backgrounds', config );
        });
    });

    describe( 'data-uris', function() {
        it( 'should be replaceable', function() {
            var config = {
                rules: function( uri ) { uri.href( 'image.png' ); }
            };

            compareFixtures( 'datauri', config );
        });
    });

    describe( 'only "content" and "cursor" properties', function() {
        it( 'should be updated', function() {
            var config = {
                properties: [ 'content', 'cursor' ],
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'filter', config );
        });
    });

    describe( 'fonts src with ie hacks', function() {
        it( 'should be replaced without errors', function() {
            var config = {
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'fonts', config );
        });
    });

    describe( 'only "content" and "cursor" properties', function() {
        it( 'should be updated', function() {
            var config = {
                imports: true,
                properties: false,
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'imports', config );
        });
    });

    describe( 'multiple url() in property value', function() {
        it( 'should be replaced without errors', function() {
            var config = {
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'multiple', config );
        });
    });

    describe( 'all properties from css 2.1 spec', function() {
        it( 'should be replaceable', function() {
            var config = {
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'properties', config );
        });
    });

    describe( 'if multiple rules match value', function() {
        it( 'only first should trigger replace', function() {
            var config = {
                rules: [
                    { from: /local\/test/, 'to': '$&1' },
                    { from: /global\/test/, 'to': '$&2' },
                    { from: /test/, 'to': '$&3' }
                ]
            };

            compareFixtures( 'rules', config );
        });
    });

    describe( 'if properties value is "true"', function() {
        it( 'it should not return error', function() {
            var config = {
                properties: true,
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'properties-default', config );
        });
    });

    describe( 'if blank url()', function() {
        it( 'it should not return error', function() {
            var config = {
                rules: [
                    { from: 'local', 'to': 'global' }
                ]
            };

            compareFixtures( 'blank-url', config );
        });
    });
} );
