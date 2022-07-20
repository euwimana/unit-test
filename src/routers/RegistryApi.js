const { Router } = require("express");

const { RegistryController } = require("../controllers");

const router = new Router();

/**
 * Create a new registry entry
 *
 * @returns { Object<String, String, String, String>     } 201 - Created
 * @returns { Object<String, Object<String, String>>     } 400 - Bad Request
 */
router.post("/", RegistryController.Create);

/**
 * Read existing registry entry
 *
 * @returns { Object<String, String, String, Date>       } 200 - OK
 * @returns { Object<String, Object<String, String>>     } 404 - Not Found
 */
router.get("/:id", RegistryController.Read);

module.exports = router;
