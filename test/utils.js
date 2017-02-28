const should = require('chai').should()
const { isSaltOk, isIterationsOk, isKeylenOk, isDigestOk, availableAlgs, isContentOk, isEncryptedContentOk } = require('../src/utils')

describe('utils functions', () => {

  describe('isSaltOk function', () => {

    it('should return false if a number is provided', done => {
      const result = isSaltOk(1234)
      result.should.be.false
      done()
    })

    it('should return false if a function is provided', done => {
      const result = isSaltOk(() => console.log())
      result.should.be.false
      done()
    })

    it('should return false if an undefined value is provided', done => {
      const result = isSaltOk(undefined)
      result.should.be.false
      done()
    })

    it('should return false if an object is provided', done => {
      const result = isSaltOk({ test: 'test' })
      result.should.be.false
      done()
    })

    it('should return true if \'false\' is provided and it can accept false', done => {
      const result = isSaltOk(false, true)
      result.should.be.true
      done()
    })

    it('should return false if \'false\' is provided and it cannot accept false', done => {
      const result = isSaltOk(false)
      result.should.be.false
      done()
    })

    it('should return true if a Buffer is provided', done => {
      const result = isSaltOk(Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]))
      result.should.be.true
      done()
    })
  })

  describe('isIterationsOk function', () => {

    it('should return false if a string is provided', done => {
      const result = isIterationsOk('wrongtype')
      result.should.be.false
      done()
    })

    it('should return false if a function is provided', done => {
      const result = isIterationsOk(() => console.log())
      result.should.be.false
      done()
    })

    it('should return false if an undefined value is provided', done => {
      const result = isIterationsOk(undefined)
      result.should.be.false
      done()
    })

    it('should return false if an object is provided', done => {
      const result = isIterationsOk({ test: 'test' })
      result.should.be.false
      done()
    })

    it('should return true if a number is provided', done => {
      const result = isIterationsOk(1000)
      result.should.be.true
      done()
    })
  })

  describe('isKeylenOk function', () => {

    it('should return false if a string is provided', done => {
      const result = isKeylenOk('wrongtype')
      result.should.be.false
      done()
    })

    it('should return false if a function is provided', done => {
      const result = isKeylenOk(() => console.log())
      result.should.be.false
      done()
    })

    it('should return false if an undefined value is provided', done => {
      const result = isKeylenOk(undefined)
      result.should.be.false
      done()
    })

    it('should return false if an object is provided', done => {
      const result = isKeylenOk({ test: 'test' })
      result.should.be.false
      done()
    })

    it('should return true if a number is provided', done => {
      const result = isKeylenOk(1000)
      result.should.be.true
      done()
    })
  })

  describe('isDigestOk function', () => {

    it('should return false if a number is provided', done => {
      const result = isDigestOk(12433)
      result.should.be.false
      done()
    })

    it('should return false if a function is provided', done => {
      const result = isDigestOk(() => console.log())
      result.should.be.false
      done()
    })

    it('should return false if an undefined value is provided', done => {
      const result = isDigestOk(undefined)
      result.should.be.false
      done()
    })

    it('should return false if an object is provided', done => {
      const result = isDigestOk({ test: 'test' })
      result.should.be.false
      done()
    })

    it('should return false if a string is provided, but it is not included in the available digests', done => {
      const result = isDigestOk('wrong')
      result.should.be.false
      done()
    })

    it('should return true if a string is provided and it is included in the available digests', done => {
      const sampleDigest = availableAlgs[Math.floor(Math.random() * availableAlgs.length)];
      const result = isDigestOk(sampleDigest)
      result.should.be.true
      done()
    })
  })

  describe('isContentOk function', () => {

    it('should return false if a number is provided', done => {
      const result = isContentOk(12433)
      result.should.be.false
      done()
    })

    it('should return false if a function is provided', done => {
      const result = isContentOk(() => console.log())
      result.should.be.false
      done()
    })

    it('should return false if an undefined value is provided', done => {
      const result = isContentOk(undefined)
      result.should.be.false
      done()
    })

    it('should return false if an object is provided', done => {
      const result = isContentOk({ test: 'test' })
      result.should.be.false
      done()
    })

    it('should return true if a string is provided', done => {
      const result = isContentOk('stringcontent')
      result.should.be.true
      done()
    })
  })

  describe('isEncryptedContentOk function', () => {

    it('should return false if a number is provided', done => {
      const result = isEncryptedContentOk(12433)
      result.should.be.false
      done()
    })

    it('should return false if a function is provided', done => {
      const result = isEncryptedContentOk(() => console.log())
      result.should.be.false
      done()
    })

    it('should return false if an undefined value is provided', done => {
      const result = isEncryptedContentOk(undefined)
      result.should.be.false
      done()
    })

    it('should return false if an object is provided', done => {
      const result = isEncryptedContentOk({ test: 'test' })
      result.should.be.false
      done()
    })

    it('should return true if a string is provided', done => {
      const result = isEncryptedContentOk('stringcontent')
      result.should.be.true
      done()
    })
  })
})