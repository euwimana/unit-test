const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const Helpers = require("../utils/helpers");

const { BadRequestException } = require("../utils/exceptions");

class Blockchain extends Sequelize.Model {}

Blockchain.init(
  {
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isValidDate(value) {
          if (!Number.isNaN(value.getTime())) return;
          throw new BadRequestException("endTime should be a valid date", {
            path: "endTime",
          });
        },
        isInThePast(value) {
          if (value.getTime() <= Date.now()) return;
          throw new BadRequestException("endTime should be in the past", {
            path: "endTime",
          });
        },
      },
    },
    payload: {
      type: Sequelize.VIRTUAL,
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
  },
  {
    hooks: {
      async beforeSave(instance) {
        const { payload, nonce, hash } = instance;

        const hashed = await Helpers.HashString(payload + nonce);

        if (hashed === hash) return;

        throw new BadRequestException("Invalid hash", { path: "hash" });
      },
    },
    sequelize,
  }
);

exports.Blockchain = Blockchain;
