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

// Access accounts through the `eth` property
web3.eth.getAccounts().then(accounts => {
    console.log(accounts); // should print 10 accounts
}).catch(error => {
    console.error("Error fetching accounts:", error);
});

web3.eth.getAccounts().then(accounts => {
    accounts.forEach(account => {
        web3.eth.getBalance(account).then(balance => {
            console.log(`Account: ${account} - Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        });
    });
}).catch(error => {
    console.error("Error fetching accounts or balances:", error);
});
