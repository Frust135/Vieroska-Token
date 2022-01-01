const VieroskaToken = artifacts.require("VieroskaToken");

module.exports = function (deployer) {
  deployer.deploy(VieroskaToken);
};
