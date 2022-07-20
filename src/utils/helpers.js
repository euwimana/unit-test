const crypto = require("crypto");

/**
 * This method generates a hashed string from the provided plain string. It returns a string representation of
 * the hashed input string.
 * @param   { String                     } plain
 * @returns { String                     } Hashed string
 */
exports.HashString = async (plain) => {
  const hash = crypto.createHash("sha256").update(plain);
  return hash.digest("hex");
};
