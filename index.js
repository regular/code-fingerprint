const normalize = require('./normalize')
const crypto = require('crypto')

module.exports = function(src) {
  const result = normalize(src)
  if (result.err) throw result.err
  const {code, warnings} = result
  console.log(result)
  const hash = crypto.createHash('sha256')
  hash.update(code)
  return hash.digest('base64')
}
