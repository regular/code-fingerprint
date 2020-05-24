const normalize = require('./normalize')
const crypto = require('crypto')

module.exports = function(src, warningsRef) {
  const result = normalize(src)
  if (result.err) throw result.err
  const {code, warnings} = result
  if (warningsRef) {
    warnings.forEach(w=>warningsRef.push(w))
  }

  const hash = crypto.createHash('sha256')
  hash.update(code)
  return hash.digest('base64')
}
