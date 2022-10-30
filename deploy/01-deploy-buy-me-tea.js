//import 
//main function
//calling of main function  
// function deployFunc() {
//     console.log("Hi")
//     hre.getNamedAccounts()
//     hre.deployments
// }
// module.exports.default = deployFunc

const { network } = require("hardhat")
const {networkConfig, developmentChains} = require("../hepler-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({getNamedAccounts, deployments}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const {chainId} = network.config.chainId
    
    //if chainId is x then use address y
    let ethUsdPriceFeedAddress
    if(developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    }
    else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    //mock contract is minimal version of real world contract that exist on mainnetwork 
    //to use local testing


    //well what happens when 
    // when going for localhost or hardhat network we want to use a mock
    const buyMeTea = await deploy("BuyMeTea",{
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true
    })
    log("-----------------------------------------------------------------")
}

module.exports.tags = ["all","buymetea"]