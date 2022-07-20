const chai = require("chai");
const sinon = require("sinon");
const { faker } = require("@faker-js/faker");

const Helpers = require("../../../src/utils/helpers");

const { Registry } = require("../../../src/models");

const { dbSync } = require("../../common");

chai.use(require("chai-as-promised"));

const { expect } = chai;

describe("Model Registry(payload: String, hash: String-)", () => {
  const stubs = {};

  before(async () => {
    await dbSync();
  });

  beforeEach(() => {
    Object.assign(stubs, { HashString: sinon.stub(Helpers, "HashString") });
  });

  afterEach(async () => {
    await Registry.destroy({ cascade: true, force: true, truncate: true });
    sinon.restore();
  });

  it("Should not save without payload", async () => {
    const registry = Registry.build();
    return expect(
      registry.validate({ fields: ["payload"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should not save if payload is not a string", async () => {
    const registry = Registry.build({ payload: faker.datatype.number() });
    return expect(
      registry.validate({ fields: ["payload"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  it("Should save if hash is not provided", async () => {
    const registry = Registry.build({});
    return expect(
      registry.validate({ fields: ["hash"] })
    ).to.eventually.be.fulfilled.and.be.an("object");
  });

  it("Should not save if hash is provided", async () => {
    const registry = Registry.build({ hash: faker.random.alphaNumeric(64) });
    return expect(
      registry.validate({ fields: ["hash"] })
    ).to.eventually.be.rejectedWith(Error);
  });

  describe("payload is provided and valid", () => {
    let registry;

    beforeEach(async () => {
      registry = Registry.build({ payload: faker.random.alphaNumeric(15) });
    });

    it("Should save to registry", async () => {
      return expect(registry.save()).to.eventually.be.fulfilled.and.be.an(
        "object"
      );
    });
  });
});
