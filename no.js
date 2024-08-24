const { Web3 } = require('web3'); // Destructure the Web3 object from the package
const web3 = new Web3('HTTP://127.0.0.1:7545');



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
const account = "enter acc addres to want show result";  // Your Ethereum account address

web3.eth.getBalance(account)
    .then(balance => {
        console.log(`Account: ${account} - Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    })
    .catch(error => {
        console.error("Error fetching balance:", error);
    });



// transfer eth from one account to another account


const fromAccount = "enter your from account address";  // Your Ethereum account address
const toAccount = "enter your to account address";  // Recipient Ethereum account address
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
