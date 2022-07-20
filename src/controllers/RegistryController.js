/* eslint-disable no-async-promise-executor */
const { Registry } = require("../models");
const { NotFoundException } = require("../utils/exceptions");

class RegistryController {
  /**
   * This method is part of Registry CRUD. It creates a new registry entry and returns it.
   *
   * @param   { Object } request
   * @param   { Object } response
   * @returns { Object }
   */
  static async Create(request, response) {
    const promise = await new Promise(async (resolve) => {
      try {
        const { body } = request;
        const { id, payload, hash, createdAt } = await Registry.create(body);

        resolve({ status: 201, response: { id, payload, hash, createdAt } });
      } catch (error) {
        resolve({
          status: 400,
          response: {
            message: error.message,
            description: { field: error.path, message: error.message },
          },
        });
      }
    });

    return response.status(promise.status).send(promise.response);
  }

  /**
   * This method is part of Registry CRUD. It reads a registry entry by it ID and returns it.
   *
   * @param   { Object } request
   * @param   { Object } response
   * @returns { Object }
   */
  static async Read(request, response) {
    const promise = await new Promise(async (resolve) => {
      const { id } = request.params;
      try {
        const registry = await Registry.findOne({ where: { id } });

        if (!registry) throw new NotFoundException("Data Not Found");

        const { payload, hash, createdAt } = registry;

        resolve({ status: 201, response: { id, payload, hash, createdAt } });
      } catch (error) {
        resolve({
          status: 404,
          response: {
            message: error.message,
            description: {
              field: "id",
              message: `No registry found that corresponds to id: ${id}`,
            },
          },
        });
      }
    });

    return response.status(promise.status).send(promise.response);
  }
}

exports.RegistryController = RegistryController;
