const { assert, expect } = require("chai")
const { deployments ,ethers, getNamedAccounts} = require("hardhat")

describe("BuyMeTea", async function () {
    let buyMeTea
    let deployer
    let mockV3Aggregator
    const sendValue = ethers.utils.parseEther("1") // 1 ETH


    beforeEach(async function (){
        //deploy the contract 
        //using Hardhat-deploy
        // const accounts = await ethers.getSigners()
        // const accountZero = accounts[0]
        deployer = await (getNamedAccounts()).deployer
        await deployments.fixture("all")
        buyMeTea = await ethers.getContract("BuyMeTea",deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator",deployer)

    })
    describe("constructor", async function () {
        it("sets the aggregator address correctly",async function () {
            const response = await buyMeTea.priceFeed()
            assert.equal(response,mockV3Aggregator.address)

        })
    })
    describe("Fund", async function () {
        it("Fails if you don't send enough ETH",async()=> {
            await expect(buyMeTea.fund()).to.be.revertedWith("Didn't send enough") 
        })
        // it("updated the amount funded data structure", async function() {
        //     await buyMeTea.fund({value: sendValue})
        //     const response = await buyMeTea.addressToAmountFunded(deployer)
        //     console.log(response)
        //     // assert.equal(response.toString(), sendValue.toString())
        // })
    })
    // it()
    // it()
    // it()
})