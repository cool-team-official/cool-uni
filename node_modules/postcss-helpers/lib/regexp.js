'use strict';

/** Making url() RegExp according to css tokenization rules:
 *    http://www.w3.org/TR/CSS21/syndata.html#tokenization
 */

var R_W        = '[ \\t\\r\\n\\f]*';
var R_NL       = '\\n|\\r\\n|\\r|\\f';
var R_UNICODE  = '\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?';
var R_NONASCII = '[^\\0-\\237]';
var R_ESCAPE   = R_UNICODE + '|\\\\[^\\n\\r\\f0-9a-f]';
var R_STRING_1 = '\\"([^\\n\\r\\f\\\\"]|\\\\'   + R_NL + '|' + R_ESCAPE + ')*\\"';
var R_STRING_2 = '\\\'([^\\n\\r\\f\\\\\']|\\\\' + R_NL + '|' + R_ESCAPE + ')*\\\'';
var R_STRING   = '(' + R_STRING_1 + '|' + R_STRING_2 + ')';
var R_URI      = 'url\\(' + R_W + R_STRING + R_W + '\\)|url\\(' + R_W + '([!#$%&*-\\[\\]-~]|' + R_NONASCII + '|' + R_ESCAPE + ')*' + R_W + '\\)';

module.exports = {
    STRINGS: new RegExp( R_STRING, 'ig' ),
    URLS:    new RegExp( R_URI, 'ig' )
};
