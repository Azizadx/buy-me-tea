# About the project

This is a Solidity smart contract designed to enable users to send Ether (ETH) to the contract in exchange for some sort of tea-related reward. The contract is called "BuyMeTea" and is built on the Ethereum blockchain.

## Usage
To use this smart contract, you will need to deploy it on the Ethereum blockchain using a development environment like Hardhat or Remix. Once deployed, users can send ETH to the contract using the fund function. The withdraw function can be used by the contract owner to withdraw all of the ETH stored in the contract, which will be distributed back to the funders in proportion to the amount each funder contributed.

## Structure
The contract includes a constructor that initializes the owner of the contract and a reference to an external price feed (specified by the address passed to the constructor). It also includes a modifier that restricts certain functions to be only callable by the owner of the contract.

The contract imports another Solidity file called "PriceConverter.sol" and uses a library called "PriceConverter" to convert values from the external price feed to ETH. The contract also imports the AggregatorV3Interface from the "Chainlink" library, which provides a decentralized way to get external data such as price feeds.


## Try it yourself

```shell
git clone https://github.com/Azizadx/buy-me-tea
npm i
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Authors

👤 **Nasrallah**

- GitHub: [@Azizadx](https://github.com/Azizadx)

## Acknowledgments 🙏

GitHub: [@chain](https://github.com/smartcontractkit)

## 🙌 Want to Contribute?

* 🐛 [Report an issue](../../issues/)


## Show your support
![Alt Text](https://media.giphy.com/media/GTO6zNnYr5Wv0p8gAT/giphy.gif)

## License
This project is licensed under the MIT license. See the SPDX-License-Identifier declaration in the contract code for details
