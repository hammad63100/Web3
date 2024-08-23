solc = require("solc");

fs = require("fs");
Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let fileContent = fs.readFileSynC("demo.sol").toString();

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