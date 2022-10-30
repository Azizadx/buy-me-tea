// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeTea {
    string public WelcomMsg = "Welcome to buy me tea contract";
    string testVal;


    function retrieve() public view  returns (string memory) {
        return WelcomMsg;
    }
}
