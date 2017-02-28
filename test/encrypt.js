const should = require('chai').should()
const { generateSalt, encryptContent, encrypt } = require('../src/encrypt')

describe('generateSalt function', () => {

  it('should return a promise', done => {
    generateSalt().should.be.a('promise')
    done()
  })

  it('should return a buffer of randomBytes', () => {
    return new Promise((resolve, reject) => {
      generateSalt()
        .then(salt => {
          salt.should.not.be.null
          Buffer.isBuffer(salt).should.be.true
          resolve()
        })
        .catch(err => reject(err))
    })
  })
})

describe('encryptContent function', () => {
  const fakeInfos = {
    content: 'test',
    salt: 'fakesalt123',
    iterations: 10000,
    keylen: 512,
    digest: 'sha512'
  }

  it('should return a promise', done => {
    encryptContent(fakeInfos).should.be.a('promise')
    done()
  })

  it('should return the content encrypted', () => {
    return new Promise((resolve, reject) => {
      generateSalt()
        .then(salt => {
          encryptContent({
            content: 'password',
            salt,
            iterations: 10000,
            keylen: 512,
            digest: 'sha512'
          })
          .then(result => {
            result.should.not.be.null
            result.should.not.be.empty
            result.salt.should.be.a('string')
            result.salt.should.be.eql(salt.toString('hex'))
            result.encryptedContent.should.be.a('string')
            result.encryptedContent.should.not.be.null
            result.encryptedContent.should.have.length.above(0)
            resolve()
          })
          .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  })
})

describe('encrypt function', () => {

  it('should return an error message in case of wrong type of salt', () => {
    return new Promise((resolve, reject) => {
      encrypt({ salt: 900 })
        .then(result => {
          reject()
        })
        .catch(err => {
          err.should.not.be.null
          err.should.be.a('string')
          resolve()
        })
    })
  })

  it('should return an error message in case of wrong type of iterations', () => {
    return new Promise((resolve, reject) => {
      encrypt({ iterations: 'wrongiterations' })
        .then(result => {
          reject()
        })
        .catch(err => {
          err.should.not.be.null
          err.should.be.a('string')
          resolve()
        })
    })
  })

  it('should return an error message in case of wrong type of keylen', () => {
    return new Promise((resolve, reject) => {
      encrypt({ keylen: 'wrongiterations' })
        .then(result => {
          reject()
        })
        .catch(err => {
          err.should.not.be.null
          err.should.be.a('string')
          resolve()
        })
    })
  })

  it('should return an error message in case of wrong type of digest (number)', () => {
    return new Promise((resolve, reject) => {
      encrypt({ digest: 1234 })
        .then(result => {
          reject(result)
        })
        .catch(err => {
          err.should.not.be.null
          err.should.be.a('string')
          resolve()
        })
    })
  })

  it('should return an error message in case of wrong type of digest (string not in available list)', () => {
    return new Promise((resolve, reject) => {
      encrypt({ digest: 'wrongdigest' })
        .then(result => {
          reject(result)
        })
        .catch(err => {
          err.should.not.be.null
          err.should.be.a('string')
          resolve()
        })
    })
  })

  it('should return an object containing the salt used and the crypted content, both converted to string', () => {
    return new Promise((resolve, reject) => {
      encrypt({ content: 'password' })
        .then(result => {
          result.should.not.be.null
          result.should.not.be.empty
          result.should.be.a('object')

          result.salt.should.be.a('string')
          result.salt.should.have.length.above(0)

          result.encryptedContent.should.be.a('string')
          result.encryptedContent.should.have.length.above(0)
          resolve()
        })
        .catch(err => {
          reject(err)
      })
    })
  })
})
