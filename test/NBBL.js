//here it goes test module for NBBL token on mainnet
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test Module for NBBL token", function () {
  let nbblAuthority,
    accounts,
    admin,
    NBBL_treasure,
    governor,
    guardian,
    policy,
    vault,
    nbblToken;
  before(async function () {
    accounts = await ethers.getSigners();
    admin = accounts[0];
    NBBL_treasure = accounts[1];
    governor = accounts[4];
    guardian = accounts[5];
    policy = accounts[6];
    vault = accounts[7];
  });
  beforeEach(async function () {
    const NBBLAuthority = await ethers.getContractFactory("NBBLAuthority");
    nbblAuthority = await NBBLAuthority.deploy(
      admin.address,
      guardian.address,
      policy.address,
      vault.address
    );
    await nbblAuthority.deployed();
    console.log("nbblAuthority Contract deployed to: ", nbblAuthority.address);

    const NBBLToken = await ethers.getContractFactory("NBBLToken");
    nbblToken = await NBBLToken.deploy(nbblAuthority.address);
    await nbblToken.deployed();
    console.log("nbblToken contract deployed to: ", nbblToken.address);
  });

  it("10000 NBBL Token mint to admin address", async function () {
    await nbblToken
      .connect(vault)
      .mint(admin.address, ethers.utils.parseEther("10000"));
    const balance = await nbblToken.balanceOf(admin.address);
    console.log("admin balance is, ", balance);
    expect(balance).to.be.equal(ethers.utils.parseEther("10000"));
    console.log("10000 nbbl Token successfully minted to admin address");
  });

  it("Transfer 5000 NBBL token to other wallet", async function () {
    await nbblToken
      .connect(vault)
      .mint(admin.address, ethers.utils.parseEther("10000"));
    const balance = await nbblToken.balanceOf(admin.address);
    await nbblToken
      .connect(admin)
      .approve(vault.address, ethers.utils.parseEther("5000"));
    await nbblToken
      .connect(admin)
      .transfer(vault.address, ethers.utils.parseEther("5000"));
    expect(await nbblToken.balanceOf(vault.address)).to.be.equal(
      ethers.utils.parseEther("5000")
    );
    console.log("5000 NBBL token is successfully transfered to Vault");
  });
});
