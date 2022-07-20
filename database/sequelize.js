const config = require("config");

const database = config.get("database");

module.exports = { ...database, dialect: "postgres" };
