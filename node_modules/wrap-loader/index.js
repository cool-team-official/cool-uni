const utils = require('loader-utils')

module.exports = function (source) {
  this.cacheable()

  const opts = utils.getOptions(this) || {}
  return [].concat(opts.before, source, opts.after).join('\n').trim()
}
