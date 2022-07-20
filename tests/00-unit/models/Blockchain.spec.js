const chai = require("chai");
const sinon = require("sinon");
const { faker } = require("@faker-js/faker");

const Helpers = require("../../../src/utils/helpers");

const { Blockchain } = require("../../../src/models");

const { dbSync } = require("../../common");

chai.use(require("chai-as-promised"));

const { expect } = chai;

describe("Model Blockchain(endTime: Date, payload: String*, nonce: Number, hash: String)", () => {
  const stubs = {};

  before(async () => {
    await dbSync();
  });

  beforeEach(() => {
    Object.assign(stubs, { HashString: sinon.stub(Helpers, "HashString") });
  });

  afterEach(async () => {
    await Blockchain.destroy({ cascade: true, force: true, truncate: true });
    sinon.restore();
  });

  it("Should not save without endTime", async () => {
    const blockchain = Blockchain.build();
    return expect(
      blockchain.validate({ fields: ["endTime"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should not save if endTime is not a valid date", async () => {
    const blockchain = Blockchain.build({
      endTime: faker.random.alphaNumeric(15),
    });
    return expect(
      blockchain.validate({ fields: ["endTime"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should not save if endTime is not in the past", async () => {
    const blockchain = Blockchain.build({ endTime: faker.date.future() });
    return expect(
      blockchain.validate({ fields: ["endTime"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should not save if payload is not provided", async () => {
    const blockchain = Blockchain.build({});
    return expect(
      blockchain.validate({ fields: ["payload"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should not save if nonce is not provided", async () => {
    const blockchain = Blockchain.build({});
    return expect(
      blockchain.validate({ fields: ["nonce"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should not save if hash is not provided", async () => {
    const blockchain = Blockchain.build({});
    return expect(
      blockchain.validate({ fields: ["hash"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  describe("Both endTime, payload, nonce, and hash are provided and valid", () => {
    let blockchain;

    beforeEach(async () => {
      const endTime = faker.date.recent();
      const payload = faker.random.alphaNumeric(15);
      const nonce = faker.datatype.number();
      const hash = faker.random.alphaNumeric(64);
      blockchain = Blockchain.build({ endTime, payload, nonce, hash });
    });

    it("Should save if Blockchain if hash corresponds to payload + nonce", async () => {
      stubs.HashString.resolves(blockchain.hash);
      return expect(blockchain.save()).to.eventually.be.fulfilled.and.be.an(
        "object"
      );
    });

    it("Should save if Blockchain if hash doesn't correspond to payload + nonce", async () => {
      stubs.HashString.resolves(faker.random.alphaNumeric(64));
      return expect(blockchain.save()).to.eventually.be.rejectedWith(Error);
    });
  });
});
