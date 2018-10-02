const mockPathConfig = require("./mockPathConfig.json");

const pathConfigCollectionDouble = {
  findOne: query => {
    if (query._id === "1.0.0") {
      return mockPathConfig;
    } else {
      return null;
    }
  }
};

module.exports = { pathConfigCollectionDouble };
