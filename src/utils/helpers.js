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

/**
 * This method recursively generates a hashed string that satisfies the challenge condition.
 *
 * @param   { String                     } hashes
 * @param   { String                     } challenge
 * @param   { Number                     } [nonce=0]
 * @returns { Object                     } Object containing nonce and hash
 */
exports.Mine = async (hashes, challenge, nonce = 0) => {
  const hash = await this.HashString(hashes + nonce);
  if (new RegExp(challenge).test(hash)) {
    return { nonce, hash };
  }
  return this.Mine(hashes, challenge, Math.floor(Math.random() * 2147483647));
};
