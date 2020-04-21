var inherits = require('util').inherits
var Parser = require('postcss/lib/parser')
var tokenizer = require('./tokenize')

inherits(InlineParser, Parser)

module.exports = InlineParser

function InlineParser(input) {
  Parser.call(this, input)
}

InlineParser.prototype.createTokenizer = function() {
  this.tokenizer = tokenizer(this.input)
}
