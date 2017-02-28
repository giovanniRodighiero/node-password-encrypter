const compare = (() => {
  const { encrypt } = require('./encrypt')
  const { isContentOk, isEncryptedContentOk, errorMessages } = require('./utils')

  const inputContainErrors = ({ content, encryptedContent }) => {
    if (!isContentOk(content)) { return errorMessages.content }
    if (!isEncryptedContentOk(encryptedContent)) {
      return errorMessages.encryptedContent
    }
    return false
  }

  const compare = ({ content, encryptedContent, salt, iterations, keylen, digest }) => (
    new Promise((resolve, reject) => {
      const errors = inputContainErrors({ content, encryptedContent })
      if (errors) {
        return reject(errors)
      }
      salt = Buffer.from(salt, 'hex')
      encrypt({ content, salt, iterations, keylen, digest })
        .then(result => resolve(result.encryptedContent === encryptedContent))
        .catch(err => reject(err))
    })
  )

  return {
    compare
  }
})()

module.exports = compare
