const Exception = require("./Exception");

class TooEarlyException extends Exception {
  constructor(message, meta) {
    super(message, "Too Early", 425, meta);
  }
}

module.exports = TooEarlyException;
