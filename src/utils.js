const utils = (() => {
  const crypto = require('crypto')

  const availableAlgs = crypto.getHashes()

  const isSaltOk = (salt, acceptFalse) => acceptFalse ? Buffer.isBuffer(salt) || (salt === false) : Buffer.isBuffer(salt) // false is default value, it will be generated later

  const isIterationsOk = iterations => typeof iterations === 'number'

  const isKeylenOk = keylen => typeof keylen === 'number'

  const isDigestOk = digest => (typeof digest === 'string' && availableAlgs.includes(digest))

  const isContentOk = content => typeof content === 'string'

  const isEncryptedContentOk = encryptedContent => typeof encryptedContent === 'string'

  const errorMessages = {
    salt: 'Salt must be a buffer',
    iterations: 'Iterations must be a number',
    keylen: 'Keylen must be a number',
    digest: 'Digest must be a string and match one of the available options',
    content: 'A content to compare must be provided as a string',
    encryptedContent: 'An encrypted content must be provided as a string'
  }

  return {
    isSaltOk,
    isIterationsOk,
    isKeylenOk,
    isDigestOk,
    isContentOk,
    isEncryptedContentOk,
    errorMessages,
    availableAlgs
  }
})()

module.exports = utils
