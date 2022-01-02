// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VieroskaToken{
    string public name = "Vieroska";
    string public symbol = "VSK";
    string public standard = "Vieroska V1.0";
    uint256 public totalSupply; // uint = Unasigned integer
    mapping(address => uint256) public balanceOf; // Mapping is like hash dictionary

    // Constructors are public by default
    // Underscore is using for variables that aren't global
    constructor(uint256 _initialSupply){
        // Allocate the initial supply somewhere        
        balanceOf[msg.sender] = _initialSupply; //Msg is a global variable from solidity
        totalSupply = _initialSupply;
    }
}