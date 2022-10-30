//import 
//main function
//calling of main function  

const { network } = require("hardhat")

// function deployFunc() {
//     console.log("Hi")
//     hre.getNamedAccounts()
//     hre.deployments
// }
// module.exports.default = deployFunc

module.exports = async ({getNamedAccounts, deployments}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const {chainId} = network.config.chainId
    
    //if chainId is x then use address y
    

    //well what happens when 
    // when going for localhost or hardhat network we want to use a mock
    const buyMeTea = await deploy("BuyMeTea",{
        from: deployer,
        args: [/**
            address
            //put price feed address
        */],
        log: true
    })
}