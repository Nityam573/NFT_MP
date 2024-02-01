require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require("fs");
require("dotenv").config();
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const PRIVATE_KEY = "a5cf19f197b51895bc4df633edc57246e31b29efbdd0b6d1e22c9d21d6167b74";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    testnet_bitfinity: {
      url: "https://testnet.bitfinity.network",
      accounts: [PRIVATE_KEY],
      gasPrice: 15,
      chainId: 355113,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
