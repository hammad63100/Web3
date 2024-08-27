//connect Remix Ide with Ganache
// Ganache is a personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests. It is available both as a desktop application and a command-line tool.

// Import Web3
const { Web3 } = require('web3'); // Destructure the Web3 object from the package
// Create a new instance of Web3 and connect to Ganache
const web3 = new Web3('HTTP://127.0.0.1:7545');



// ABI (Application Binary Interface) of your contract
const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_x",
        "type": "uint256"
      }
    ],
    "name": "setVal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "x",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address (ensure it's correct)
const contractAddress = "0x7af01054272E63F712c480EE87669a71B6964429";

// Create a new contract instance
const contract = new web3.eth.Contract(abi, contractAddress);


// Call the x function
contract.methods.x()
  .call()
  .then((val) => {
    console.log("Value of x: ", Number(val));
  })
  .catch((e) => {
    console.log("Something went wrong: ", e);
  });


// Set the value of x
// const newVal = 20;
// contract.methods.setVal(newVal)
//   .send({ from: '0x68016838419A4f4f73Dc01Ef279a2F887759C0Be' })
//   .then(() => {
//     console.log("Value of x set to: ", newVal);
//   })
//   .catch((e) => {
//     console.log("Something went wrong: ", e);
//   }); 



// if code run its want new value 
const prompt = require('prompt-sync')();
const newVal = prompt("Enter the new value for x: ");

contract.methods.setVal(newVal)
  .send({ from: '0x68016838419A4f4f73Dc01Ef279a2F887759C0Be' })
  .then(() => {
    console.log("Value of x set to: ", newVal);
  })
  .catch((e) => {
    console.log("Something went wrong: ", e);
  });

  
