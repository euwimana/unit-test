module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Blockchains", {
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nonce: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hash: {
        type: Sequelize.CHAR(64),
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Blockchains");
  },
};
