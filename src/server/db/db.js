const { info } = require("winston");
const db = require("./models");

const connectToDb = async () => {
  try {
    await db.sequelize.authenticate();
    info("Connection to postgres db has been established successfully.");
  } catch (err) {
    info(`Unable to connect to the database: ${err}`);
  }

  return db;
};

const closeConnection = async () => {
  return await db.sequelize.close();
};
module.exports = {
  Council: db.council,
  connectToDb,
  closeConnection
};
