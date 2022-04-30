//c;

window.onload = function () {};
var abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "giveRightToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "Proposal",
        type: "uint256",
      },
    ],
    name: "voting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winingProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "winningProposal_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "string",
        name: "winnername_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const address = "0x08F8646B528C3Ec83Af4f41EAFf2c1dE19e85990"
const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.send("eth_requestAccounts", []);
const contract = new ethers.Contract(
    address,
    abi,
    provider
    );

const vote = async() => {
    const signer = provider.getSigner(0);
    const contra = new ethers.Contract(address,abi,signer)
    var proposalval = document.getElementById('select1').value;
    console.log(proposalval);
    const ret = await contra.voting(proposalval);

}

const main = async () => {
  try {
    const proposal0 = await contract.proposals(0);
    document.getElementById("candidate0name").innerHTML = proposal0[0];
    document.getElementById("candidate0").innerHTML = parseInt(proposal0[1], 16);
    const proposal1 = await contract.proposals(1);
    document.getElementById("candidate1name").innerHTML = proposal1[0];
    document.getElementById("candidate1").innerHTML = parseInt(proposal1[1], 16);
    const proposal2 = await contract.proposals(2);
    document.getElementById("candidate2name").innerHTML = proposal2[0];
    document.getElementById("candidate2").innerHTML = parseInt(proposal2[1], 16);
  } catch (err) {
    () => {
      console.log(err);
    };
  }
};

main();
vote()