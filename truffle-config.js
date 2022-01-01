module.exports = {

  networks: {
    development: {
      host: "127.0.0.1", // Host and port from Ganache server
      port: "7545",
      network_id: "*" // Match any network ID
    }
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.10",
    }
  },

};
