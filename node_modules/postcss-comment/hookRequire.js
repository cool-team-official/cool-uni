var Parser = require('postcss/lib/parser')
var tokenizer = require('./lib/tokenize')

Parser.prototype.createTokenizer = function () {
  this.tokenizer = tokenizer(this.input)
}

module.exports = require('postcss')

