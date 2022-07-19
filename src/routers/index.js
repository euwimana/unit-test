const { Router } = require("express");

const database = require("../utils/database");

const router = Router();

router.get("/", async (req, res) => {
  const auth = database.authenticate();
  const version = process.env.npm_package_version;

  const dbStatus = await auth.then(() => "UP").catch(() => "DOWN");

  return res.json({ service: "LnL", version, database: { dtatus: dbStatus } });
});

module.exports = router;
