const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require('fs');
const infuraKey = fs.readFileSync(".key-secret").toString().trim();;
const mnemonic = fs.readFileSync(".mnemonic-secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`)
      },
      network_id: 4,
      gas: 5500000,
      skipDryRun: true
    }
  }
};