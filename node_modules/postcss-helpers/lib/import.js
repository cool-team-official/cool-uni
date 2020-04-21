'use strict';

// using URLjs because I don't want to think about all this:
// http://blog.lunatech.com/2009/02/03/what-every-web-developer-must-know-about-url-encoding
var regexp    = require( './regexp' );
var URI    = require( 'urijs' );
var UrlHelper = require( './url' );

/**
 * ImportHelper constructor
 * @constructor
 * @param {String} rule @import value.
 */
var ImportHelper = function ( rule ) {
    var exports = {};

    if ( ! ( this instanceof ImportHelper ) ) {
        return new ImportHelper( rule );
    }

    this._originalURI = this._extractURI( rule );

    if ( !this._originalURI ) { return false; }

    this._originalRule = rule;
    this._mediaQuery  = this.getOriginalMediaQuery();

    this.URI = URI( this._originalURI );

    exports.URI                   = this.URI;
    exports.getOriginalURI        = this.getOriginalURI.bind( this );
    exports.getModifiedRule       = this.getModifiedRule.bind( this );
    exports.getOriginalRule       = this.getOriginalRule.bind( this );
    exports.setMediaQuery         = this.setMediaQuery.bind( this );
    exports.getMediaQuery         = this.getMediaQuery.bind( this );
    exports.getOriginalMediaQuery = this.getOriginalMediaQuery.bind( this );

    return exports;
};

ImportHelper.prototype = Object.create( UrlHelper.prototype );

ImportHelper.prototype.constructor = ImportHelper;

/**
 * Extracts URI from rule.
 * @private
 * @param   {String} rule String to test.
 * @returns {String|undefined} Returns URI value or undefined.
 */
ImportHelper.prototype._extractURI = function( rule ) {
    if ( rule.match( regexp.URLS ) ) {
        return rule.match( regexp.URLS )[ 0 ]
            .replace( /^url\s?\(/, '' )
            .replace( /\)$/, '' )
            .trim()
            .replace( /^("|\')/, '' )
            .replace( /("|\')$/, '' );
    }

    else if ( rule.match( regexp.STRINGS ) ) {
        return rule.match( regexp.STRINGS )[ 0 ]
            .replace( /^("|\')/, '' )
            .replace( /("|\')$/, '' );
    }

};

/**
 * Returns media query from original string.
 * @returns {String|boolean} Media query or false.
 */
ImportHelper.prototype.getOriginalMediaQuery = function() {
    var query = this.getOriginalRule();
    if ( query.match( regexp.URLS ) ) {
        query = query.replace( regexp.URLS, '' ).trim();
    }
    else {
        query = query.replace( regexp.STRINGS, '' ).trim();
    }

    return query || false;
};

/**
 * Returns current media query.
 * @returns {String|boolean} Media query or false.
 */
ImportHelper.prototype.getMediaQuery = function() {
    return this._mediaQuery;
};

/**
 * Sets media query value.
 * @param {String} query New media query.
 */
ImportHelper.prototype.setMediaQuery = function( query ) {
    this._mediaQuery = query;
};

/**
 * Returns modified rule.
 * @returns {String} Modified rule.
 */
ImportHelper.prototype.getModifiedRule = function () {
    var rule = UrlHelper.prototype.getModifiedRule.apply( this );

    if ( this.getMediaQuery() !== this.getOriginalMediaQuery() ) {
        if ( this.getOriginalMediaQuery() ) {
            rule = rule.replace( this.getOriginalMediaQuery(), this.getMediaQuery() || '' ).trim();
        }
        else if ( this.getMediaQuery() ) {
            rule = rule + ' ' + this.getMediaQuery();
        }
    }

    return rule;
};

module.exports = ImportHelper;
