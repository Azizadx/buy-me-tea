const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("BuyMeTea", async function () {
    let buyMeTea
    let deployer
    let mockV3Aggregator
    const sendValue = ethers.utils.parseEther("1") // 1 ETH


    beforeEach(async function () {
        //deploy the contract
        //using Hardhat-deploy
        // const accounts = await ethers.getSigners()
        // const accountZero = accounts[0]
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture("all")
        buyMeTea = await ethers.getContract("BuyMeTea", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)

    })
    describe("constructor", async function () {
        it("sets the aggregator address correctly", async function () {
            const response = await buyMeTea.priceFeed()
            assert.equal(response, mockV3Aggregator.address)

        })
    })
    describe("Fund", async function () {
        it("Fails if you don't send enough ETH", async () => {
            await expect(buyMeTea.fund()).to.be.revertedWith("Didn't send enough")
        })
        it("updated the amount funded data structure", async function () {
            await buyMeTea.fund({ value: sendValue })
            const response = await buyMeTea.addressToAmountFunded(deployer)
            // console.log(response)
            assert.equal(response.toString(), sendValue.toString())
        })
        it("Add funder to array of funders", async function () {
            await buyMeTea.fund({ value: sendValue })
            const funder = await buyMeTea.funders(0)
            // console.log(deployer)
            assert.equal(funder, deployer)
        })

    })
    describe("Withdrawl test", async function () {
        beforeEach(async function () {
            await buyMeTea.fund({ value: sendValue })
        })
        it("withdraw ETH from a single founder", async function () {
            //Arrange
            const startingFundMeBalance = await buyMeTea.provider.getBalance(buyMeTea.address)
            const startingFundMeDeployerBalance = await buyMeTea.provider.getBalance(deployer)
            //Act
            const transactionResponse = await buyMeTea.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            //gasCost
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingBuyMeTea = await buyMeTea.provider.getBalance(buyMeTea.address)
            const endingDeployerBalance = await buyMeTea.provider.getBalance(deployer)

            //Assert
            assert.equal(endingBuyMeTea, 0)
            assert.equal(startingFundMeBalance.add(startingFundMeDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString())
            // assert.equal
        })
        it("allows us to withdraw with multiple funders", async function () {
            const accounts = await ethers.getSigners()
            for (let i = 0; i < 6; i++) {
                const buyMeTeaConnnectedContract = await buyMeTea.connect(accounts[i])
                await buyMeTeaConnnectedContract.fund({ value: sendValue })
            }
            const startingFundMeBalance = await buyMeTea.provider.getBalance(buyMeTea.address)
            const startingFundMeDeployerBalance = await buyMeTea.provider.getBalance(deployer)

            //Act
            const transactionResponse = await buyMeTea.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            //gasCost
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice)
            const endingBuyMeTea = await buyMeTea.provider.getBalance(buyMeTea.address)
            const endingDeployerBalance = await buyMeTea.provider.getBalance(deployer)
            //assert
            assert.equal(endingBuyMeTea, 0)
            assert.equal(startingFundMeBalance.add(startingFundMeDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString())
            // Make sure that the funders are reset properly
            await expect(buyMeTea.funders(0)).to.be.reverted
            for (let i = 1; i < 6; i++) {
                assert.equal(await buyMeTea.addressToAmountFunded(accounts[i].address), 0)
            }
        })
        // it("Only allows the owner to withdraw", async function () {
        //     const accounts = await ethers.getSigners()
        //     const attacker = accounts[1]
        //     const attackerConnectdContract = await buyMeTea.connect(attacker)
        //     await expect(attackerConnectdContract.withdraw()).to.be.revertedWith("BuyMeTea_NotOwner")
        // })
    })
})