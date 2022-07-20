const chai = require("chai");
const { faker } = require("@faker-js/faker");

const { HashString } = require("../../../src/utils/helpers");

chai.use(require("chai-as-promised"));

const { expect } = chai;

describe("src/utils/Helpers", () => {
  describe("HashString(plain: string): Promise<string>", () => {
    it("Should throw Error if plain is not provided", async () => {
      return expect(HashString()).to.eventually.be.rejectedWith(Error);
    });

    it("Should return the hash if valid plain is provided", async () => {
      const plain = faker.random.alphaNumeric(25);

      return expect(HashString(plain)).to.eventually.be.fulfilled.and.satisfy(
        (hash) => {
          const regex = /^(?=[a-z0-9]{64}).*$/i;
          return regex.test(hash);
        }
      );
    });
  });
});
