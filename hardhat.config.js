require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-gas-reporter")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"hardhat",
  networks: {
    localhost:{
      url: "http://127.0.0.1:8545",
      chainId:31337
    },
    // rinkeby:{},
    goerli:{
      url:GOERLI_RPC_URL,
      accounts:[
        PRIVATE_KEY
      ],
      chainId:5
    }
  },
  gasReporter: {
    enabled:true,
    // outputFile:"gas-Report.txt",
    // noColorss: true,
    // currency: "USD",
    //coinmarketcap:APIKEY

  },
  namedAccounts: {
    deployer: {
      default: 0,
      31337: 1,
    },
    user:{
      default: 1,
    }
  }
};
