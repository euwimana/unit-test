const { sequelize } = require("../src/models");

exports.dbSync = async () => {
  await sequelize.sync({ force: true });
};
