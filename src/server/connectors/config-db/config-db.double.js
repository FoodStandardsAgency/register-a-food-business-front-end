const pathConfigMock = require("../../../__mocks__/pathConfigMock.json");

const configVersionCollectionDouble = {
    findOne: (query) => {
        if (query._id === "1.0.0") {
            return pathConfigMock;
        } else {
            return null;
        }
    }
};

module.exports = { configVersionCollectionDouble };
