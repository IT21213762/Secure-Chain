const ShareFile = artifacts.require("ShareFile");

module.exports = function (deployer) {
    deployer.deploy(ShareFile);
};
