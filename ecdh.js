var sodium = require('sodium-native')

// ECDH
// x25519

// Create Alice keypair
var AlicePublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICKEYBYTES)
var AlicePrivateKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)

sodium.crypto_box_keypair(AlicePublicKey, AlicePrivateKey)

console.log(`Alice ${sodium.crypto_box_PUBLICKEYBYTES}-byte public key is: ${AlicePublicKey.toString('hex')}`)
console.log(`Alice ${sodium.crypto_box_SECRETKEYBYTES}-byte private key is: ${AlicePrivateKey.toString('hex')}`)

// Create Bob keypair
var BobPublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICKEYBYTES)
var BobPrivateKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)

sodium.crypto_box_keypair(BobPublicKey, BobPrivateKey)

console.log(`Bob ${sodium.crypto_box_PUBLICKEYBYTES}-byte public key is: ${BobPublicKey.toString('hex')}`)
console.log(`Bob ${sodium.crypto_box_SECRETKEYBYTES}-byte private key is: ${BobPrivateKey.toString('hex')}`)

// Alice to create secret using her private key and bob's public key
var AliceSharedSecret = sodium.sodium_malloc(sodium.crypto_scalarmult_BYTES)
sodium.sodium_memzero(AliceSharedSecret)

sodium.crypto_scalarmult(AliceSharedSecret, AlicePrivateKey, BobPublicKey)

console.log(`Alice created ${sodium.crypto_scalarmult_BYTES}-byte secret: ${AliceSharedSecret.toString('hex')}`)

// Bob to create secret using his private key and alice's public key
var BobSharedSecret = sodium.sodium_malloc(sodium.crypto_scalarmult_BYTES)
sodium.sodium_memzero(BobSharedSecret)

sodium.crypto_scalarmult(BobSharedSecret, BobPrivateKey, AlicePublicKey)

console.log(`Bob created ${sodium.crypto_scalarmult_BYTES}-byte secret: ${BobSharedSecret.toString('hex')}`)
