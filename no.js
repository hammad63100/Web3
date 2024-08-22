// const Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HTTPProvider("http://localhost:7545"));

// web3.eth.getAccounts()
//   .then(accounts => {
//     console.log("Accounts:", accounts);
//   })
//   .catch(err => console.error(err));

//   const fs = require('fs');
// const solc = require('solc');


const { Web3 } = require('web3'); // Destructure the Web3 object from the package
const web3 = new Web3('HTTP://127.0.0.1:7545');

// // this code give me only address of the account
// web3.eth.getAccounts().then(accounts => {
//     console.log(accounts); // should print 10 accounts
// }).catch(error => {
//     console.error("Error fetching accounts:", error);
// });



// // this code give me  address and balance of the account
web3.eth.getAccounts().then(accounts => {
    accounts.forEach(account => {
        web3.eth.getBalance(account).then(balance => {
            console.log(`Account: ${account} - Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        });
    });
}).catch(error => {
    console.error("Error fetching accounts or balances:", error);
});


// // this code give me only one result of the account which i mention
// const account = "0x68016838419A4f4f73Dc01Ef279a2F887759C0Be";  // Your Ethereum account address

// web3.eth.getBalance(account)
//     .then(balance => {
//         console.log(`Account: ${account} - Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
//     })
//     .catch(error => {
//         console.error("Error fetching balance:", error);
//     });



// transfer eth from one account to another account


const fromAccount = "0x68016838419A4f4f73Dc01Ef279a2F887759C0Be";  // Your Ethereum account address
const toAccount = "0x8105442FccD9bb85Da7eEdca602AF04fb6d72480";  // Recipient Ethereum account address
const amount = web3.utils.toWei('1', 'ether');  // Amount to transfer

async function sendTransaction() {
    try {
        const receipt = await web3.eth.sendTransaction({
            from: fromAccount,
            to: toAccount,
            value: amount,
            gas: 21000,
        });
        console.log("Transaction successful, receipt:", receipt);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

sendTransaction();
