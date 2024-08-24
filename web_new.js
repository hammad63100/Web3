solc = require("solc");
fs = require("fs");
const { Web3 } = require('web3'); 
// Create a new instance of Web3 and connect to Ganache
const web3 = new Web3('HTTP://127.0.0.1:8545');


let fileContent = fs.readFileSync("demo.sol").toString();

console.log(fileContent);


//format for input soli

var input = {
    language: "Solidity",
    sources: {
        "demo.sol": {
            content: fileContent,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};


// output form the above input
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

// get the bytecode and ABI
ABI = output.contracts["demo.sol"]["demo"].abi;

bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;

console.log("abi: ",ABI);
console.log("bytecode: ",bytecode);


// Deploy the contract
const contract = new web3.eth.Contract(ABI);


let defaultAccount;
web3.eth.getAccounts().then((accounts) =>{
    console.log("Accounts:  ", accounts);
    defaultAccount=accounts[0];
})
