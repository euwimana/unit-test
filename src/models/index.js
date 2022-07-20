const sequelize = require("../utils/database");
const { Registry } = require("./Registry");
const { Blockchain } = require("./Blockchain");

exports.sequelize = sequelize;
exports.Registry = Registry;
exports.Blockchain = Blockchain;
