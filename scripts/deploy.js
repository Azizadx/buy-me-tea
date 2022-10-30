//import 
const {ethers} = require("hardhat")
//async main 
async function main() {
  const BuyMeTeaFactory = await ethers.getContractFactory("BuyMeTea")
  console.log("Deploying contract...")
  const BuyMeTea = await BuyMeTeaFactory.deploy()
  await BuyMeTea.deployed()
  //what's the private key?
  //what's the rpc url?
  console.log(`Deployed contract to: ${BuyMeTea.address}`)
}
//verify our contract
//call the funcation main
main().then(()=> process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
})