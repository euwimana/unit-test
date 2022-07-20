const { Router } = require("express");

const database = require("../utils/database");
const RegistryApi = require("./RegistryApi");
const MineApi = require("./MineApi");

const router = Router();

router.get("/", async (req, res) => {
  const auth = database.authenticate();
  const version = process.env.npm_package_version;

  const dbStatus = await auth.then(() => "UP").catch(() => "DOWN");

  return res.json({ service: "LnL", version, database: { status: dbStatus } });
});

router.use("/registry", RegistryApi);
router.use("/mine", MineApi);

module.exports = router;
