/*global describe, it */
'use strict';

var assert       = require( 'assert' );
var UrlHelper    = require( './../lib/url' );
var UrlsHelper   = require( './../lib/urls' );
var ImportHelper = require( './../lib/import' );


/**
* UrlHelper fuxtures
*/

var UrlRules = [
    {
        originalURI:    'http://google.com/logo.png',
        originalRule:   'url( \'http://google.com/logo.png\' ) no-repeat top left',
        originalSuffix: 'png',
        modifiedHref:   'logo.png',
        modifiedRule:   'url( \'logo.png\' ) no-repeat top left',
    },
    {
        originalURI:    'http://google.com/logo.png',
        originalRule:   'url( "http://google.com/logo.png" ) no-repeat top left',
        originalSuffix: 'png',
        modifiedHref:   'logo.png',
        modifiedRule:   'url( "logo.png" ) no-repeat top left',
    },
    {
        originalURI:    'http://google.com/logo.png',
        originalRule:   'url( http://google.com/logo.png ) no-repeat top left',
        originalSuffix: 'png',
        modifiedHref:   'logo.png',
        modifiedRule:   'url( logo.png ) no-repeat top left',

    },
    // Really UGLY fix for ?#iefix case, urijs normalized it's value
    {
        originalURI:    'font.eot?#iefix',
        originalRule:   'url( font.eot?#iefix )',
        originalSuffix: 'eot',
        modifiedHref:   'font2.eot#iefix',
        modifiedRule:   'url( font2.eot?#iefix )',

    },
    // Fix for blank url()
    {
        originalURI:    '',
        originalRule:   'url()',
        originalSuffix: '',
        modifiedHref:   'image.png',
        modifiedRule:   'url(\'image.png\')',

    },
];

/**
* UrlHelper tests
*/

UrlRules.forEach( function( v ) {
    describe( 'For UrlHelper("' + v.originalRule + '")', function() {
        var h = new UrlHelper( v.originalRule );

        describe( '#getOriginalRule()', function() {
            it( 'should return "' + v.originalRule, function() {
                assert.equal( h.getOriginalRule(), v.originalRule );
            });
        });

        describe( '#URI.suffix()', function() {
            it( 'should return "' + v.originalSuffix, function() {
                assert.equal( h.URI.suffix(), v.originalSuffix );
            });
        });

        describe( '#URI.href()', function() {
            it( 'should return "' + v.modifiedHref + '" after #URI.href(' + v.modifiedHref + ')', function() {
                h.URI.href( v.modifiedHref );
                assert.equal( h.URI.href(), v.modifiedHref );
            });
        });

        describe( '#getModifiedRule()', function() {
            it( 'should return "' + v.modifiedRule + ' after #URI.href(' + v.modifiedHref + ')', function() {
                assert.equal( h.getModifiedRule(), v.modifiedRule );
            });
        });

        describe( '#getOriginalURI()', function() {
            it( 'should return "' + v.originalURI, function() {
                assert.equal( h.getOriginalURI(), v.originalURI );
            });
        });
    } );
} );

/**
* UrlsHelper fuxtures
*/

var UrlsRules = [
    {
        originalURIS:   [ '1.jpg', '2.png' ],
        originalRule:   'url( \'1.jpg\' ) no-repeat top left, url( \'2.png\' )',
        modifiedHref:   '3.svg',
        modifiedRule:   'url( \'3.svg\' ) no-repeat top left, url( \'3.svg\' )',
    },
    {
        originalURIS:   [ '1.jpg', '2.png' ],
        originalRule:   'url( "1.jpg" ) no-repeat top left, url( "2.png" )',
        modifiedHref:   '3.svg',
        modifiedRule:   'url( "3.svg" ) no-repeat top left, url( "3.svg" )',
    },
    {
        originalURIS:   [ '1.jpg', '2.png' ],
        originalRule:   'url( 1.jpg ) no-repeat top left, url( 2.png )',
        modifiedHref:   '3.svg',
        modifiedRule:   'url( 3.svg ) no-repeat top left, url( 3.svg )',
    },
];


/**
* UrlsHelper tests
*/

UrlsRules.forEach( function( v ) {
    describe( 'For UrlsHelper("' + v.originalRule + '")', function() {
        var h = new UrlsHelper( v.originalRule );

        describe( '#URIS array', function() {
            it( 'should contain "' + v.originalURIS[0] + '" and "' + v.originalURIS[ 1 ] + '"' , function() {
                assert.deepEqual( [ h.URIS[ 0 ].href(), h.URIS[ 1 ].href() ], v.originalURIS );
            });
        });

        describe( '#getOriginalRule()', function() {
            it( 'should return "' + v.originalRule, function() {
                assert.equal( h.getOriginalRule(), v.originalRule );
            });
        });

        describe( '#getModifiedRule()', function() {
            it( 'should return "' + v.modifiedRule + ' after setting #URI.href(' + v.modifiedHref + ') to each object in URIS.', function() {
                h.URIS.forEach( function( uri ) { uri.href( v.modifiedHref ); } );
                assert.equal( h.getModifiedRule(), v.modifiedRule );
            });
        });
    } );
} );

/**
* ImportHelper fuxtures
*/

var ImportRules = [
    {
        originalQuery:  'print',
        query:          false,
        originalURI:    'fineprint.css',
        originalRule:   'url("fineprint.css") print',
        modifiedHref:   'style.css',
        modifiedRule:   'url("style.css")'
    },
    {
        originalQuery:  'projection, tv',
        query:          'projection, tv',
        originalURI:    'bluish.css',
        originalRule:   'url( bluish.css ) projection, tv',
        modifiedHref:   'style.css',
        modifiedRule:   'url( style.css ) projection, tv',
    },
    {
        originalQuery:  false,
        query:          false,
        originalURI:    'custom.css',
        originalRule:   '\'custom.css\'',
        modifiedHref:   'style.css',
        modifiedRule:   '\'style.css\''

    },
    {
        originalQuery:  false,
        query:          'projection, tv',
        originalURI:    'chrome://communicator/skin/',
        originalRule:   'url("chrome://communicator/skin/")',
        modifiedHref:   'style.css',
        modifiedRule:   'url("style.css") projection, tv'

    },
    {
        originalQuery:  'screen, projection',
        query:          'screen and (orientation:landscape)',
        originalURI:    'common.css',
        originalRule:   '"common.css" screen, projection',
        modifiedHref:   'style.css',
        modifiedRule:   '"style.css" screen and (orientation:landscape)'
    },
    {
        originalQuery:  'screen and (orientation:landscape)',
        query:          'screen, projection',
        originalURI:    'landscape.css',
        originalRule:   'url(\'landscape.css\') screen and (orientation:landscape)',
        modifiedHref:   'style.css',
        modifiedRule:   'url(\'style.css\') screen, projection'
    }
];

/**
* ImportHelper tests
*/

ImportRules.forEach( function( v ) {
    describe( 'For ImportHelper("' + v.originalRule + '")', function() {
        var h = new ImportHelper( v.originalRule );

        describe( '#getOriginalRule()', function() {
            it( 'should return "' + v.originalRule, function() {
                assert.equal( h.getOriginalRule(), v.originalRule );
            });
        });

        describe( '#URI.href()', function() {
            it( 'should return "' + v.modifiedHref + '" after #URI.href( "' + v.modifiedHref + '" )', function() {
                h.URI.href( v.modifiedHref );
                assert.equal( h.URI.href(), v.modifiedHref );
            });
        });

        describe( '#getOriginalURI()', function() {
            it( 'should return "' + v.originalURI + '"', function() {
                assert.equal( h.getOriginalURI(), v.originalURI );
            });
        });

        describe( '#getOriginalMediaQuery()', function() {
            it( 'should return "' + v.originalQuery + '"', function() {
                assert.equal( h.getOriginalMediaQuery(), v.originalQuery );
            });
        });

        describe( '#getMediaQuery()', function() {
            it( 'should return "' + v.query + '" after #setMediaQuery( "' + v.query + '" )', function() {
                h.setMediaQuery( v.query );
                assert.equal( h.getMediaQuery(), v.query );
            });
        });

        describe( '#getModifiedRule()', function() {
            it( 'should return "' + v.modifiedRule + ' after #URI.href(' + v.modifiedHref + ')', function() {
                assert.equal( h.getModifiedRule(), v.modifiedRule );
            });
        });
    } );
} );
