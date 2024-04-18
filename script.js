// const parseArgs = require("npx/parse-args");

const web3 = new Web3(window.ethereum);
var account;
const CONTRACT_ADDR = "0x2d73b2e42Fa172755b23819f68141C0950A40915";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidateName",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "candidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let user = document.getElementById("address");

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR);

document.addEventListener("DOMContentLoaded", function () {
	try{
		if (window.ethereum) {
			ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
			  account = accounts[0];
			  console.log(account);
			//   user.innerHTML = "" + account;
			});
		  } else {
			window.alert("Please install Metamask");
		  }
	}
	catch(err){
		console.log("Metamask is not installed" + err);
	}

  contract.methods
    .candidateCount()
    .call()
    .then((e) => {
      for (var i = 1; i <= e; i++) {
        contract.methods
          .candidates(i)
          .call()
          .then((f) => {
            console.log(f);
            document.getElementById(f.id).innerHTML = f.name;
            document.getElementById("candidate" + f.id).innerHTML = f.voteCount;
          });
      }
    });
});

function vote() {
  var candidateId = document.getElementById("candidate").value;

  const transaction = {
    from: account,
    to: CONTRACT_ADDR,
    data: contract.methods.vote(candidateId).encodeABI(),
    gas: 420000,
  };

  web3.eth
    .sendTransaction(transaction)
    .on("transactionHash", function (hash) {
      console.log("Transaction Hash ", hash);
    })
    .on("error", function (error) {
      console.log(error);
    });
}

// async function verifyCertificate() {
//   const hash = document.getElementById('hash').value;
//   const isValid = await contract.methods.validateCertificate(hash).call();
//   alert(isValid ? "Certificate is valid" : "Certificate is invalid");
// }