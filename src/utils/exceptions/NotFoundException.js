const Exception = require("./Exception");

class NotFoundException extends Exception {
  constructor(message, meta) {
    super(message, "Not Found", 404, meta);
  }
}

module.exports = NotFoundException;
