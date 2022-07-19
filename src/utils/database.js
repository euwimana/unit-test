const config = require("config");
const { Sequelize } = require("sequelize");

const dbConfig = config.get("database");

const { database, username, password, ...params } = dbConfig;

module.exports = new Sequelize(database, username, password, {
  ...params,
  define: { paranoid: true },
  dialect: "postgres",
  // eslint-disable-next-line no-console
  logging: (msg) => console.log(`[database] ${msg}`),
  minifyAliases: true,
  version: true,
});
