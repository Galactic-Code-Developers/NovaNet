require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    "novanet-core": {
      url: process.env.NOVANET_CORE_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    "novanet-delegator": {
      url: process.env.NOVANET_DELEGATOR_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    "novanet-validator": {
      url: process.env.NOVANET_VALIDATOR_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
