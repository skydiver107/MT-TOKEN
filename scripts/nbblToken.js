// NBBL token for the USERS to purchase news
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const chainId = await deployer.getChainId();
  console.log("deploying with the account ", deployer.address);

  const NBBLAuthority = await ethers.getContractFactory("NBBLAuthority");
  const nbblAuthority = await NBBLAuthority.deploy(
    deployer.address,
    deployer.address,
    deployer.address,
    deployer.address
  ); // should change when deploying on Mainnet Polygon
  await nbblAuthority.deployed();
  console.log("nbblAuthority Contract deployed to: ", nbblAuthority.address);

  const NBBLToken = await hre.ethers.getContractFactory("NBBLToken");
  const nbblToken = await NBBLToken.deploy(nbblAuthority.address);
  await nbblToken.deployed();
  console.log("NBBL token contract deployed to ", nbblToken.address);

  await nbblToken.mint(deployer.address, ethers.utils.parseEther("100000"));
  console.log("0.1M NBBL token minted to the deployer's address");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
