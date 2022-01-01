// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VieroskaToken{
    uint256 public totalSupply; // uint = Unasigned integer

    // Constructors are public by default
    constructor(){ 
        totalSupply = 500;
    }
}