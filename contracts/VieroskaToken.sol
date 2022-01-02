// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VieroskaToken{
    string public name = "Vieroska";
    string public symbol = "VSK";
    string public standard = "Vieroska V1.0";
    uint256 public totalSupply; // uint = Unasigned integer
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    mapping(address => uint256) public balanceOf; // Mapping is like hash dictionary

    // Constructors are public by default
    // Underscore is using for variables that aren't global
    constructor(uint256 _initialSupply){
        // Allocate the initial supply somewhere        
        balanceOf[msg.sender] = _initialSupply; //Msg is a global variable from solidity, sender catch who is calling the function
        totalSupply = _initialSupply;
    }

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value); // Require check if condition is true to continue with the function
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}