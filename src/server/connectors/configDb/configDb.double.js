const mockPathConfig = require("./mockPathConfig.json");

const pathConfigCollectionDouble = {
  findOne: () => mockPathConfig
};

module.exports = { pathConfigCollectionDouble };
