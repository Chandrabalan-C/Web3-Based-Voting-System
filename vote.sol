//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Voting{
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;

    mapping(address => bool)public hasVoted;

    uint public candidateCount;

    constructor(string[] memory _candidateName){
        candidateCount = 0;
        for(uint i = 0; i < _candidateName.length; i++){
            addCandidate(_candidateName[i]);
        }
    }

    function addCandidate(string memory name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
    }

    function vote(uint _candidateId)public {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid Candidate ID");
        require(!hasVoted[msg.sender], "Already Voted!");
        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getVoteCount(uint _candidateId)public view returns(uint){
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid Candidate ID");
        return candidates[_candidateId].voteCount;
    }
}