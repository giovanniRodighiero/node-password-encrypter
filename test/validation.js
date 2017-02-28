const should = require('chai').should()
const { compare, encrypt } = require('../index')

describe('Validation Test', () => {
  describe('encrypt', () => {
    it('should return the salt and the encryptedContent', () => {
      return new Promise((resolve, reject) => {
        encrypt({
           content: 'password'
          })
          .then(result => {
            result.should.not.be.null
            result.should.not.be.undefined
            result.should.be.a('object')

            result.salt.should.be.a('string')
            result.salt.should.have.length.above(0)

            result.encryptedContent.should.be.a('string')
            result.encryptedContent.should.have.length.above(0)
            resolve()
          })
          .catch(err => reject(err))
      })
    })
  })

  describe('compare', () => {
    return new Promise((resolve, reject) => {

    })
  })
})