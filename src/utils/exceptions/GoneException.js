const Exception = require("./Exception");

class GoneException extends Exception {
  constructor(message, meta) {
    super(message, "Gone", 410, meta);
  }
}

module.exports = GoneException;
