solc = require("solc");
fs = require("fs");
const { Web3 } = require('web3');
// Create a new instance of Web3 and connect to Ganache
const web3 = new Web3('HTTP://127.0.0.1:8545');


// Read the Solidity contract file
let fileContent = fs.readFileSync("demo.sol").toString();
console.log("Solidity code:\n", fileContent);

// Format the input for solc
var input = {
    language: "Solidity",
    sources: {
        "demo.sol": {
            content: fileContent,
        },
    },
    settings: {
        optimizer: {  // Enable Solidity optimizer
            enabled: true,
            runs: 200,
        },
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};


// Compile the Solidity code
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Solc Output:\n", output);

// Check for errors in the compilation output
if (output.errors) {
    output.errors.forEach((err) => {
        console.error(err.formattedMessage);
    });
}

// Extract ABI and Bytecode
const ABI = output.contracts["demo.sol"]["demo"].abi;
const bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;

console.log("ABI: ", ABI);
console.log("Bytecode: ", bytecode);

// Get the list of accounts and deploy the contract
web3.eth.getAccounts().then((accounts) => {
    console.log("Accounts:  ", accounts);
    const defaultAccount = accounts[0];
    console.log("Default Account: ", defaultAccount);

    // Create contract instance
    const contract = new web3.eth.Contract(ABI);

    // Deploy contract with increased gas limit
    contract.deploy({ data: bytecode })
        .send({ from: defaultAccount, gas: 3000000 })  // Increased gas limit
        .on("receipt", (receipt) => {
            console.log("Contract Address: ", receipt.contractAddress);
        })
        .then((newContractInstance) => {
            console.log("Deployed Contract Address:", newContractInstance.options.address);

            // Interact with the deployed contract (calling the `x` function)
            return newContractInstance.methods.x().call();
        })
        .then((result) => {
            console.log("Value of x:", Number(result));
        })
        .catch((err) => {
            console.error("Error deploying or interacting with contract:", err);
        });
        


});
