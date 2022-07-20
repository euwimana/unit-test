const chai = require("chai");

const supertest = require("supertest");

const app = require("../../src/app");

const { dbSync } = require("../common");

const { expect } = chai;
const request = supertest(app);

describe("API - Miscellaneous", () => {
  before(async () => {
    await dbSync();
  });

  describe("GET /", () => {
    it("Should respond with 200 OK and return API info", async () => {
      return request.get("/").expect((response) => {
        expect(response.status).to.be.equals(200);
        expect(response.body).property("service").to.be.a("string");
        expect(response.body).property("version").to.be.a("string");
        expect(response.body).property("database").to.be.a("Object");
        expect(response.body.database).property("status").to.be.a("string");
      });
    });
  });
});
