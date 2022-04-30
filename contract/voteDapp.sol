// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract voteDapp {
    struct Voter {
        uint        weight;
        bool        voted;
        address     delegate;
        uint        vote;
    }
    struct Proposal {
        string      name;
        uint        voteCount;
    }
    address public chairperson;
    mapping (address => Voter) public voters;
    Proposal[] public proposals;

    constructor() public {
        string[3] memory proposaleNames=["Oranges", "Appels", "Mangoes"];
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        for (uint i = 0; i < proposaleNames.length; i++) {
            proposals.push(Proposal({name: proposaleNames[i], voteCount:0}));
        }
    }
    function giveRightToVote(address voter) public {
        require(msg.sender == chairperson,"Only chairperson");
        require(!voters[voter].voted,"already voted");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted,"already voted");
        require(to != msg.sender, "Self voting not allowed");
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;
            require(to != msg.sender, "Found loop in delegation");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            proposals[delegate_.vote].voteCount += sender.weight;
        }
        else {
            delegate_.weight += sender.weight;
        }
    }
    function voting(uint Pro) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "has no right to vote");
        sender.voted = true;
        sender.vote = Pro;
        proposals[Pro].voteCount += sender.weight;
    }
    function winingProposal () public view returns(uint winningProposal_) {
        uint winingVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winingVoteCount) {
                winingVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winner() public view returns (string memory winnername_) {
        winnername_ = proposals[winingProposal()].name;
    }
}