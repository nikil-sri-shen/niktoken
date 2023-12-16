// SPDX-License-Identifier: MIT
const { expect } = require("chai");

describe("MyToken", function () {
  let MyToken;
  let myToken;
  let owner;
  let user;

  beforeEach(async () => {
    MyToken = await ethers.getContractFactory("NikToken");
    [owner, user] = await ethers.getSigners();
    myToken = await MyToken.deploy();
    //expect(await myToken.deployed());
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await myToken.name()).to.equal("NikToken");
    expect(await myToken.symbol()).to.equal("NIK");
  });

  it("Should have an initial total supply of 1,000,000 tokens", async function () {
    const totalSupply = await myToken.totalSupply();
    expect(await totalSupply).to.equal(1000000n * 10n ** 18n);
  });

  it("Owner should have 1,000,000 tokens initially", async function () {
    const ownerBalance = await myToken.balanceOf(owner.address);
    expect(await ownerBalance).to.equal(1000000n * 10n ** 18n);
  });

  it("Should allow a user to request 2 tokens", async function () {
    await myToken.connect(user).requestTokens(2n * 10n ** 18n);
    const userBalance = await myToken.balanceOf(user.address);
    expect(await userBalance).to.equal(2n * 10n ** 18n);
  });

  it("Should not allow a user to request more than 2 tokens at once", async function () {
    await expect(
      myToken.connect(user).requestTokens(3n * 10n ** 18n)
    ).to.be.revertedWith("You can request a maximum of 2 tokens");
  });

  it("Should allow a user to request additional tokens after spending some", async function () {
    await myToken.connect(user).requestTokens(1n * 10n ** 18n);
    await myToken.connect(user).transfer(owner.address, 1n * 10n ** 18n);
    await myToken.connect(user).requestTokens(2n * 10n ** 18n);
    const userBalance = await myToken.balanceOf(user.address);
    expect(await userBalance).to.equal(2n * 10n ** 18n);
  });
});
