const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const Helpers = require("../utils/helpers");

const { BadRequestException } = require("../utils/exceptions");

class Registry extends Sequelize.Model {}

Registry.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    payload: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value === "string") return;
          throw new BadRequestException("Payload must be a string", {
            path: "payload",
          });
        },
      },
    },
    hash: {
      type: Sequelize.CHAR(64),
      validate: {
        forbidden(value) {
          if (!value) return;
          throw new BadRequestException("Not authorized", { path: "hash" });
        },
      },
    },
  },
  {
    hooks: {
      async beforeSave(instance) {
        const { payload } = instance;
        // eslint-disable-next-line no-param-reassign
        instance.hash = await Helpers.HashString(payload);
      },
    },
    sequelize,
  }
);

exports.Registry = Registry;
