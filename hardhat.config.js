require("@nomicfoundation/hardhat-toolbox");

let { API_URL, PRIVATE_KEY } = process.env;
API_URL = "https://sepolia.infura.io/v3/9d8ada77bc1a4357a94e41f8e39ab932";
PRIVATE_KEY = [
  "b3785c18f71aaf8ffc461938aa58d87cbf5df3200510ebea79ab19111d1f5bef",
];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: API_URL,
      accounts: PRIVATE_KEY,
    },
  },
  solidity: "0.8.20",
};
