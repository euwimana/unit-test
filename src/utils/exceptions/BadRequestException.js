const Exception = require("./Exception");

class BadRequestException extends Exception {
  constructor(message, meta) {
    super(message, "Bad Request", 400, meta);
  }
}

module.exports = BadRequestException;
