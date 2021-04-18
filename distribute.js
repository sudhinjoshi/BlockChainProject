var fs = require("fs")
var BigNumber = require("big-number")

let contract = require("./lab4_contract_method_async.js")
let transfer = require("./lab4_erc20_transfer_async.js")

require('dotenv').config()
envOwnerAddress = process.env.OWNER_ADDRESS
envOwnerPrivateKey = process.env.OWNER_PRIVATE_KEY
envInfuraKey = process.env.INFURA_KEY
envContractAddress = process.env.CONTRACT_ADDRESS

const distribute = async(distributionAddresses) => {
  // read the file into an array
  //let distributionAddresses = fs.readFileSync('accounts.txt', 'utf8').split('\n');

  for (looper = 0; looper < distributionAddresses.length; looper++) {
    console.log(`address ${looper}: ${distributionAddresses[looper]}`)
  }
  // get the balance of the token owner
  let ownerBalance = await contract.getBalance(envContractAddress, envOwnerAddress)
  console.log(`owner balance is ${ownerBalance}`)

  // get 5% of the owner's balance
  // convert balance to BigNumber
  let bal = new BigNumber(ownerBalance)
  let fivepercent = bal.div(20)
  //let tokenBalanceSplit = ownerBalance * 0.05
  console.log(`5% of owner balance is: ${fivepercent}`)

  // get the number of addresses in the file
  let numberOfAddresses = distributionAddresses.length
  console.log(`number of addresses in file: ${numberOfAddresses}`)

  // get the amount to distribute per address in the file
  //let distributionAmount = tokenBalanceSplit / numberOfAddresses
  let distributionAmount = fivepercent.div(numberOfAddresses)
  console.log(`amount to distribute per address: ${distributionAmount}`)

  // iterate through the array and display the contents
  for (looper = 0; looper < distributionAddresses.length; looper++) {
    let mined = await transfer.transferFromOwner(envContractAddress, distributionAddresses[looper], distributionAmount)
    console.log(`mined: ${mined}`)
  }
} 
module.exports = { distribute }

//distribute()

// tasks
// 1. load the file DONE
// 3. get the balance of the token owner DONE
// 4. get 5% of this balance DONE (?)
// 2. iterate through the addresses in the file DONE
// 5. distribute the 5% equally between the addresses in the file DONE
// 6. execute a transfer on the contract to perform the distribution DONE




