'use strict';

var UrlHelper = require( './url' );
var regexp    = require( './regexp' );

/**
 * UrlsHelper constructor
 * @constructor
 * @param {String} rule CSS rule with many url() blocks.
 */
var UrlsHelper = function( rule ) {
    var exports = {};

    if ( !rule.match( regexp.URLS ) ) {
        return false;
    }

    if ( ! ( this instanceof UrlsHelper ) ) {
        return new UrlsHelper( rule );
    }

    this._originalRule = rule;
    this._helpers = [];
    this.URIS = [];

    rule.match( regexp.URLS ).forEach( function( url ) {
        var urlHelper = new UrlHelper( url );

        this._helpers.push( urlHelper );
        this.URIS.push( urlHelper.URI );
    }, this );

    exports.URIS            = this.URIS;
    exports.getOriginalURIS = this.getOriginalURIS.bind( this );
    exports.getModifiedRule = this.getModifiedRule.bind( this );
    exports.getOriginalRule = this.getOriginalRule.bind( this );

    return exports;
};

/**
 * Returns modified rule.
 * @returns {String} Modified rule.
 */
UrlsHelper.prototype.getModifiedRule = function() {
    var rule = this._originalRule;

    this._helpers.forEach( function ( uri ) {
        rule = rule.replace( uri.getOriginalRule(), uri.getModifiedRule() );
    } );

    return rule;
};

/**
 * Returns original rule.
 * @returns {String} Original rule.
 */
UrlsHelper.prototype.getOriginalRule = function() {
    return this._originalRule;
};

/**
 * Returns array of original URIs.
 * @returns {String} Original URIs array.
 */
UrlsHelper.prototype.getOriginalURIS = function () {
    return this._helpers.map( function( helper ) {
        return helper.getOriginalURI();
    } );
};

module.exports = UrlsHelper;
