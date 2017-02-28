const encrypt = require('./src/encrypt')
const compare = require('./src/compare')

module.exports = {
  encrypt: encrypt.encrypt,
  compare: compare.compare
}
