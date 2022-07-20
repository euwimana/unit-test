const config = require("config");
const { Sequelize } = require("sequelize");

const app = config.get("app");
const dbConfig = config.get("database");

const { database, username, password, ...params } = dbConfig;
const test = /test/.test(app.env);

module.exports = new Sequelize(database, username, password, {
  ...params,
  define: { paranoid: true },
  dialect: "postgres",
  // eslint-disable-next-line no-console
  logging: (msg) => (test ? false : console.log(`[database] ${msg}`)),

  minifyAliases: true,
  version: true,
});
