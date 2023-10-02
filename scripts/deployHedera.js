const { ethers } = require("hardhat");

async function main() {
  let wallet = (await ethers.getSigners())[0];
  //Initialize a contract factory object
  //name of contract as first parameter
  //wallet/signer used for signing the contract calls/transactions with this contract
  const MockNBBL = await ethers.getContractFactory("MockNBBL", wallet);
  //Using already intilized contract facotry object with our contract, we can invoke deploy function to deploy the contract.
  //Accepts constructor parameters from our contract
  const mockNbbl = await MockNBBL.deploy("100000000000000000000000");
  //We use wait to recieve the transaction (deployment) receipt, which contrains contractAddress
  const contractAddress = (await mockNbbl.deployTransaction.wait())
    .contractAddress;

  console.log(`NBBL token deployed to: ${contractAddress}`);

  return contractAddress;
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});