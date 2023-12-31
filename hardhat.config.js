const dotenv = require("dotenv");
dotenv.config();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

function getMnemonic(networkName) {
  if (networkName) {
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== "") {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "october slam canyon amused horror basic genius crash find stand glimpse build";
  }

  return mnemonic;
}

function accounts(chainKey) {
  return { mnemonic: getMnemonic(chainKey) };
}

const chainIds = {
  ethereum: 1,
  bsc: 56,
  avalanche: 43114,
  polygon: 137,
  arbitrumOne: 42161,
  optimism: 10,

  goerli: 5,
  hardhat: 1337,
  kovan: 42,
  ropsten: 3,
  rinkeby: 4,
  mumbai: 80001,
  "bsc-testnet": 97,
  fuji: 43113,
  "arbitrum-rinkeby": 421611,
  "optimism-kovan": 69,
  "fantom-testnet": 4002,
};

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/SvoX2WcZnGbRlL3ecuKW7blHjzlU5Se2",
        blockNumber: 14828270,
      },
      chainId: chainIds.hardhat,
    },
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: chainIds.ethereum,
      accounts: accounts(),
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: chainIds.bsc,
      accounts: accounts(),
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: chainIds.avalanche,
      accounts: accounts(),
    },
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: chainIds.polygon,
      accounts: accounts(),
      gasPrice: 500000000000, //500 gwei
    },
    arbitrumOne: {
      url: "https://rpc.ankr.com/arbitrum",
      chainId: chainIds.arbitrumOne,
      accounts: accounts(),
    },
    optimism: {
      url: "https://mainnet.optimism.io",
      chainId: chainIds.optimism,
      accounts: accounts(),
    },

    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: chainIds.rinkeby,
      accounts: accounts(),
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: chainIds["bsc-testnet"],
      accounts: accounts(),
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: chainIds.fuji,
      accounts: accounts(),
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: chainIds.mumbai,
      accounts: accounts(),
    },
    "arbitrum-rinkeby": {
      url: `https://rinkeby.arbitrum.io/rpc`,
      chainId: chainIds["arbitrum-rinkeby"],
      accounts: accounts(),
    },
    "optimism-kovan": {
      url: `https://kovan.optimism.io/`,
      chainId: chainIds["optimism-kovan"],
      accounts: accounts(),
    },
    hederaTestnet: {
      url: "https://testnet.hashio.io/api", //deployed on Gitpod, should be changed in the future
      accounts: [
        "0x0af3f93851b33cb850e6e25eb1b8deeb8cc7e05ec82ef66a4b2f1babe6a002b5",
        "0x0af3f93851b33cb850e6e25eb1b8deeb8cc7e05ec82ef66a4b2f1babe6a002b5",
      ],
      chainId: 296,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      // binance smart chain
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      // fantom mainnet
      opera: process.env.FTMSCAN_API_KEY,
      ftmTestnet: process.env.FTMSCAN_API_KEY,
      // optimism
      // optimisticEthereum: process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
      // optimisticKovan: process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
      // polygon
      polygon: "DZ395PG2JQRZRBM7DNSFX6QZASMYD5JQEC",
      polygonMumbai: "DZ395PG2JQRZRBM7DNSFX6QZASMYD5JQEC",
      // arbitrum
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      arbitrumTestnet: process.env.ARBISCAN_API_KEY,
      // avalanche
      avalanche: process.env.SNOWTRACE_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
      //hedera
      hederaTestnet: process.env.HEDERA_TESTNET_KEY
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./deploy",
    deployments: "./deployments",
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  namedAccounts: {
    deployer: {
      default: 0, // wallet address 0, of the mnemonic in .env
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.8.0",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.7.5",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
    ],
  },
};
