const { Council } = require("../../db/db");

const db = require("../../db/models");

const { logEmitter } = require("../../services/logging.service");

const managedTransaction = async (callback = () => {}) => async () =>
  await db.sequelize.transaction(async (t) => callback(t));

const modelFindOne = async (query, model, functionName, transaction = null) => {
  logEmitter.emit("functionCall", "councils-db.connector.js", functionName);

  let t = Object.assign({}, query, { transaction });
  try {
    const response = await model.findOne(t);
    logEmitter.emit(
      "functionSuccess",
      "councils-db.connector.js",
      functionName
    );
    return response;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "councils-db.connector.js",
      functionName,
      err
    );
    throw err;
  }
};

const getAllCouncils = async () => {
  let out = await Council.findAll();
  return out;
};

const getCouncilById = async (id) => {
  return modelFindOne(
    { where: { local_council_id: id } },
    Council,
    "getCouncilById"
  );
};

const getCouncilByUrl = async (url) => {
  return modelFindOne(
    { where: { local_council_url: url } },
    Council,
    "getCouncilByUrl"
  );
};

module.exports = {
  managedTransaction,
  getCouncilByUrl,
  getCouncilById,
  getAllCouncils
};
