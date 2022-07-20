const chai = require("chai");
const { faker } = require("@faker-js/faker");

const supertest = require("supertest");

const app = require("../../src/app");

const { Registry } = require("../../src/models");

const { dbSync } = require("../common");

const { expect } = chai;
const request = supertest(app);
const API = "/registry";

describe("API - Registry", () => {
  before(async () => {
    await dbSync();
  });

  afterEach(async () => {
    await Registry.destroy({ cascade: true, force: true, truncate: true });
  });

  describe(`POST ${API}`, () => {
    it("Should respond with 400 Bad Request and return error message if something wrong happened", async () => {
      return request.post(API).expect((response) => {
        expect(response.status).to.be.equals(400);
        expect(response.body).property("message").to.be.a("string");
        expect(response.body).property("description").to.be.a("object");
      });
    });

    it("Should respond with 201 Created and return a valid response", async () => {
      const data = { payload: faker.random.alphaNumeric(15) };
      return request
        .post(API)
        .send(data)
        .expect((response) => {
          expect(response.status).to.be.equals(201);
          expect(response.body).property("id").to.be.a("string");
          expect(response.body).property("payload").to.be.a("string");
          expect(response.body).property("hash").to.be.a("string");
          expect(response.body).property("createdAt").to.be.a("string");
        });
    });
  });

  describe(`GET ${API}/:id`, () => {
    it("Should respond with 404 Not Found and return error message if registry entry doesn't exist", async () => {
      const id = faker.datatype.uuid();
      return request.get(`${API}/${id}`).expect((response) => {
        expect(response.status).to.be.equals(404);
        expect(response.body).property("message").to.be.a("string");
        expect(response.body).property("description").to.be.a("object");
      });
    });

    it("Should respond with 200 OK and return a valid response", async () => {
      const data = { payload: faker.random.alphaNumeric(15) };
      const { body } = await request.post(API).send(data);
      return request.get(`${API}/${body.id}`).expect((response) => {
        expect(response.status).to.be.equals(201);
        expect(response.body).property("id").to.be.a("string");
        expect(response.body).property("payload").to.be.a("string");
        expect(response.body).property("hash").to.be.a("string");
        expect(response.body).property("createdAt").to.be.a("string");
      });
    });
  });
});
