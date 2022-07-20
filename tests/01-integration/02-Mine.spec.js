const chai = require("chai");
const { faker } = require("@faker-js/faker");

const supertest = require("supertest");

const app = require("../../src/app");

const { Registry, Blockchain } = require("../../src/models");

const { dbSync } = require("../common");

const { expect } = chai;
const request = supertest(app);
const API = "/mine";

describe("API - Mine", () => {
  before(async () => {
    await dbSync();
  });

  afterEach(async () => {
    await Registry.destroy({ cascade: true, force: true, truncate: true });
    await Blockchain.destroy({ cascade: true, force: true, truncate: true });
  });

  describe(`POST ${API}`, () => {
    it("Should respond with 400 Bad Request and return error message if something wrong happened", async () => {
      return request.post(API).expect((response) => {
        expect(response.status).to.be.equals(400);
        expect(response.body).property("message").to.be.a("string");
        expect(response.body).property("description").to.be.a("object");
      });
    });

    it("Should respond with 425 Too Early and return error message if it's too early to mine", async () => {
      const endTime = new Date();
      return request
        .post(API)
        .send({ endTime })
        .expect((response) => {
          expect(response.status).to.be.equals(425);
          expect(response.body).property("message").to.be.a("string");
          expect(response.body).property("description").to.be.a("object");
        });
    });

    it("Should respond with 201 Created and return a valid response", async () => {
      const payload = faker.random.alphaNumeric(15);
      await request.post("/registry").send({ payload });
      return request
        .post(API)
        .send({ endTime: new Date() })
        .expect((response) => {
          expect(response.status).to.be.equals(201);
          expect(response.body).property("endTime").to.be.a("string");
          expect(response.body).property("nonce").to.be.a("number");
          expect(response.body).property("hash").to.be.a("string");
          expect(response.body).property("createdAt").to.be.a("string");
        });
    });

    it("Should respond with 410 Gone and return error message if messages were already mined", async () => {
      const payload = faker.random.alphaNumeric(15);
      await request.post("/registry").send({ payload });
      const endTime = new Date();
      await request.post(API).send({ endTime });
      return request
        .post(API)
        .send({ endTime })
        .expect((response) => {
          expect(response.status).to.be.equals(410);
          expect(response.body).property("message").to.be.a("string");
          expect(response.body).property("description").to.be.a("object");
        });
    });
  });
});
