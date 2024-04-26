const { ethers } = require("hardhat");
// const { ethers } = require('ethers');
// const ethers = require('ethers');

async function main() {
  console.log("Deploying smart contract...");  
  const Medical = await ethers.getContractFactory("MedicalRecords");
  const accounts = await ethers.getSigners();
  const medical = await Medical.connect(accounts[0]).deploy();
  await medical.deployed();
  console.log(`Medical is deployed at address ${medical.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
