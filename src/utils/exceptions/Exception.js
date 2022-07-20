class Exception extends Error {
  constructor(
    message,
    title = "Internal Server Error",
    status = 500,
    meta = {}
  ) {
    super(message);
    this.title = title;
    this.status = status;
    this.meta = meta;
  }
}

module.exports = Exception;
