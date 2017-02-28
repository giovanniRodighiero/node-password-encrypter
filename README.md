# node password encrypter
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Simple promise-style password (or generic strings) encrypter based on Node.js core module [Crypto](https://nodejs.org/api/crypto.html).

* No external dependencies
* Encryption made with [crypto.pbkdf2](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback)
* Runtime generated salt with [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)

## Install
`$ yarn add node-password-encrypter`

or

`$ npm i --save node-password-encrypter`

## Usage

### Encrypt function
```JavaScript
const { encrypt } = require('node-password-encrypter')

// vanilla style

encrypt({ content: 'password' })
  .then(result => {
    console.log(result.salt) // the salt used in encryption
    console.log(result.encryptedContent) // the original content encrypted
  })
  .catch(err => console.log(err)) // errors

// new async/await style (node v7.6.0 or with babel support)

try {
  const result = await encrypt({ content: 'password' })
  console.log(result.salt) // the salt used in encryption
  console.log(result.encryptedContent) // the original content encrypted
} catch(e) {
  console.log(err)
}
```
The salt is returned as well, because (if it is not provided by the user) it is generated at runtime and you need to store with the encrypted password in order to be able to provide it when you'll need to compare a plain password with an encrypted one (a login scenario).

### Compare function
```JavaScript
const { compare } = require('node-password-encrypter')

// vanilla style

compare(
  { content: 'plainPassord',
    encryptedContent: 'superComplexEncryptedPsw',
    salt: 'saltUsed' // the one used for encrypting that encryptedContent
  })
  .then(result => console.log(result)) // true or false
  .catch(err => console.log(err)) // errors

// new async/await style (node v7.6.0 or with babel support)

try {
  const result = await compare(
  { content: 'plainPassord',
    encryptedContent: 'superComplexEncryptedPsw',
    salt: 'saltUsed'
  })
  console.log(result) // true or false
} catch(e) {
  console.log(e)
}

```

## API

### encrypt({ content, salt, iterations, keylen, digest })
* `content`: the actual password or generic string to encrypt
* `salt`: the salt to use, **must be a Buffer**. Default to `crypto.randomBytes(256)`
* `iterations`: the number of iteration. Default to `10000`
* `keylen`: requested byte length of the result. Default to `512`
* `digest`: digest function to use, refer to `crypto.getHashes()` for availables digests. Default to `sha512`

For more information refer to [crypto.pbkdf2](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback)

### compare({ content, encryptedContent, salt, iterations, keylen, digest })
* `content`: the plain password
* `encryptedContent`: the encrypted password to compare
* same options for `encrypt({})`

For reliable results, you have to pass the same config you used for encrypt.

## Development

* `$ yarn install` to add the devDependencies (mocha, chai, standard, nyc)
* `$ npm run standard` to check code style against Standard.js
* `$ npm run test` to launch the test suite
* `$ npm run coverage` to check the code coverage through nyc

## License
Licensed under the MIT License, Copyright © 2017 Giovanni Rodighiero.

See [LICENSE](./LICENSE) for more information.
