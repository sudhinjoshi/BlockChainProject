const Tx = require('ethereumjs-tx').Transaction

const Web3 = require('web3')

const web3 = new Web3("https://ropsten.infura.io/v3/1e86eba9862b4b78b37cfaf9675ffcad")

const account1 = "0x1cF88d2952A6d7FB2f6F9E76BEB2A7904c9504BA"  // this is the address of account 1 - this guy has all the MONEH
const account2 = "0x3d6d5A49d89eC0760E3607b287aE7693FA8D0c9A"  // this is the address of account 2 - this guy has very little MONEH

const privateKey1 = Buffer.from('...', 'hex')
const privateKey2 = Buffer.from('...', 'hex')

//secp256k1 (elliptic curve - 256bits)
//metamask seed phrase (12 words) - > BIP -> create 128bits of randomness
// passworrd is local only, used to encrypt the seed phrase
// derivation path: m/44’/60’/0’/0/1 -> make the same public/private keypair
// public key -> hashed/chopped -> eth address

const sendTransaction = async(raw) => {
  return await web3.eth.sendSignedTransaction(raw)
}

const transferFunds = async(account1, account2, amount) => {

  // the nonce - what is it?
  // the nonce is the transaction counter from a particular address
  
  let txCount = await web3.eth.getTransactionCount(account1)

  console.log("txCount returned: " + txCount)

  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
  }

  const tx = new Tx(txObject, {chain:'ropsten', hardfork:'petersburg'})
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')
  console.log("raw tx in hex: " + raw)
  let txReceipt = await sendTransaction(raw)
  console.log('original object: ' + txReceipt)
  //console.log("err: " + txHash.err)
  console.log("transaction hash: " + txReceipt.transactionHash)
  console.log("transaction in block " + txReceipt.blockNumber)
}

const transfer = async() => {
  await transferFunds(account1, account2, '0.123')
}

transfer()


















