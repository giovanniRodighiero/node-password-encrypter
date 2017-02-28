const encrypt = (() => {
  const crypto = require('crypto')
  const {
    isSaltOk,
    isIterationsOk,
    isKeylenOk,
    isDigestOk,
    errorMessages
  } = require('./utils')

  const inputContainErrors = ({ salt, iterations, keylen, digest }) => {
    if (!isSaltOk(salt, true)) {
      return errorMessages.salt
    }
    if (!isIterationsOk(iterations)) {
      return errorMessages.iterations
    }
    if (!isKeylenOk(keylen)) {
      return errorMessages.keylen
    }
    if (!isDigestOk(digest)) {
      return errorMessages.digest
    }
    return false
  }

  const generateSalt = () =>
    new Promise((resolve, reject) => {
      crypto.randomBytes(256, (err, buf) => {
        if (err) {
          return reject(err)
        }
        return resolve(buf)
      })
    })

  const encryptContent = ({ content, salt, iterations, keylen, digest }) =>
    new Promise((resolve, reject) => {
      crypto.pbkdf2(content, salt, iterations, keylen, digest, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({ salt: salt.toString('hex'), encryptedContent: result.toString('hex') })
      })
    })

  const encrypt = ({ content = '', salt = false, iterations = 10000, keylen = 512, digest = 'sha512' }) => {
    return new Promise((resolve, reject) => {
      const errors = inputContainErrors({ salt, iterations, keylen, digest })
      if (errors) {
        return reject(errors)
      }
      if (!salt) {
        generateSalt()
          .then(newSalt => {
            encryptContent({ content, salt: newSalt, iterations, keylen, digest })
              .then(result => resolve(result))
              .catch(err => reject(err))
          })
          .catch(err => reject(err))
      } else {
        encryptContent({ content, salt, iterations, keylen, digest })
          .then(result => resolve(result))
          .catch(err => reject(err))
      }
    })
  }

  return {
    generateSalt,
    encryptContent,
    encrypt
  }
})()

module.exports = encrypt
