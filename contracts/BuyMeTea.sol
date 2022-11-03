// Uncomment this line to use console.log
// import "hardhat/console.sol";


//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./PriceConverter.sol";

//constant and immutable 

error BuyMeTea_NotOwner();
contract BuyMeTea {
    using PriceConverter for uint256;

    uint256 public constant MIM_USD = 0.005 *1e18 ;

    address[] public funders; 
    address public immutable i_owner;
    mapping(address => uint256) public addressToAmountFunded;
    AggregatorV3Interface public priceFeed;

    //function order
    ///constructor
    ///receive
    ///fallback
    ///external
    ///public
    ///internal
    ///private
    ///view/pure 
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);

    }
    function fund() public payable {
        //1. How do we send ETH to this contract?
       require( msg.value.getConversionRate(priceFeed) >= MIM_USD, "Didn't send enough");//msg
       funders.push(msg.sender);
       addressToAmountFunded[msg.sender] = msg.value;
    }
    

    function withdraw() public onlyOwner {
        // require(msg.sender == owner,"Sender is not owner!");
        for(uint256 funderIndex = 0;funderIndex<funders.length; funderIndex++) {
            //code 
           address funder = funders[funderIndex];
           addressToAmountFunded[funder] = 0 ; 
        }
        //reset the array 
        funders = new address[](0);

        //3. call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
        //msg.sender = address
        //payable(msg.sender) = payable address
     

    }
    modifier onlyOwner {
        if( msg.sender != i_owner) {
            revert BuyMeTea_NotOwner();
        }
        // require(msg.sender == i_owner,"Sender is not owner!");
        _;
    }
}