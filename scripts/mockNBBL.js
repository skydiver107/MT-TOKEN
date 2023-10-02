const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const chainId = await deployer.getChainId();
  const treasuryWallet = deployer.address; // set treasuryWallet address of Token as deployer address, can change it after deployment
  console.log("deploying with the account ", deployer.address);

  const MockNBBL = await hre.ethers.getContractFactory("MockNBBL");
  const mockNBBL = await MockNBBL.deploy("100000000000000000000000"); // 100,000 NBBL tokens deployed
  await mockNBBL.deployed();
  console.log("MockNBBL token contract deployed to ", mockNBBL.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

