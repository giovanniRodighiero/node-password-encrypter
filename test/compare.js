const should = require('chai').should()
const { compare } = require('../src/compare')
const { encrypt } = require('../src/encrypt')

describe('compare function', () => {

  it('should return an error message in case of missing content', () => (
    new Promise((resolve, reject) => {
      compare({ encryptedContent: 'encrypted' })
        .then(result => reject(result))
        .catch(err => {
          err.should.not.be.null
          err.should.not.be.undefined
          err.should.be.a('string')
          resolve()
        })
    })
  ))

  it('should return an error message in case of missing encryptedContent', () => (
    new Promise((resolve, reject) => {
      compare({ content: 'content' })
        .then(result => reject(result))
        .catch(err => {
          err.should.not.be.null
          err.should.not.be.undefined
          err.should.be.a('string')
          resolve()
        })
    })
  ))

  it('should return false in case of different passwords provided', () => (
    new Promise((resolve, reject) => {
      encrypt({ content: 'password' })
        .then(result => {
          compare({ content: 'differentPassword', encryptedContent: result.encryptedContent, salt: result.salt })
            .then(result => {
              result.should.not.be.null
              result.should.not.be.undefined
              result.should.be.a('boolean')
              result.should.be.false
              resolve()
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  ))

  it('should return true in case of equals passwords provided', () => (
    new Promise((resolve, reject) => {
      encrypt({ content: 'samepassword' })
        .then(result => {
          compare({ content: 'samepassword', encryptedContent: result.encryptedContent, salt: result.salt })
            .then(result => {
              result.should.not.be.null
              result.should.not.be.undefined
              result.should.be.a('boolean')
              result.should.be.true
              resolve()
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  ))
})