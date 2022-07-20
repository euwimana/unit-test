/* eslint-disable no-async-promise-executor */
const config = require("config");

const { Op } = require("sequelize");

const { Blockchain, Registry, sequelize } = require("../models");
const {
  BadRequestException,
  TooEarlyException,
  GoneException,
} = require("../utils/exceptions");
const { Mine } = require("../utils/helpers");

class MineController {
  /**
   * This method is part of Blockchain CRUD. It creates a new blockchain entry and returns it.
   *
   * @param   { Object } request
   * @param   { Object } response
   * @returns { Object }
   */
  static async Create(request, response) {
    const { challenge, minRegistry } = config.get("app");
    const promise = await new Promise(async (resolve) => {
      try {
        const { body } = request;
        const { endTime } = body;
        if (!endTime) {
          throw new BadRequestException("Bad Request", {
            field: "endTime",
            message: "endTime is required",
          });
        }
        const transaction = await sequelize.transaction(async (t) => {
          const lastBlockchain = await Blockchain.findOne({
            order: [["createdAt", "DESC"]],
          });
          const where = { [Op.lte]: endTime };
          if (lastBlockchain) {
            if (new Date(endTime) <= lastBlockchain.endTime) {
              throw new GoneException("Gone", {
                field: "endTime",
                message: "endTime mined already",
              });
            }
            Object.assign(where, { [Op.gt]: lastBlockchain.endTime });
          }
          // Validate endTime against Gone
          const registries = await Registry.findAll({
            where: { createdAt: { ...where } },
            transaction: t,
          });

          if (registries.length < minRegistry) {
            throw new TooEarlyException("Too Early", {
              field: "endTime",
              message: "too early for the specified endTime",
            });
          }

          const payload = registries.reduce(
            (prev, { hash }) => prev + hash,
            ""
          );

          const { nonce, hash } = await Mine(payload, challenge);

          const { createdAt } = await Blockchain.create(
            { endTime, payload, nonce, hash },
            { transaction: t }
          );
          return { endTime, nonce, hash, createdAt };
        });

        resolve({ status: 201, response: { ...transaction } });
      } catch (error) {
        resolve({
          status: error.status,
          response: { message: error.message, description: error.meta },
        });
      }
    });

    return response.status(promise.status).send(promise.response);
  }
}

exports.MineController = MineController;
