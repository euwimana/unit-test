const { Router } = require("express");

const { MineController } = require("../controllers");

const router = new Router();

/**
 * Create a blockchain entry
 *
 * @returns { Object<String, String, String, String>     } 201 - Created
 * @returns { Object<String, Object<String, String>>     } 410 - Gone
 * @returns { Object<String, Object<String, String>>     } 425 - Too Early
 */
router.post("/", MineController.Create);

module.exports = router;
