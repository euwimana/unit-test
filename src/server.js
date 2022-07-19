const http = require("http");
const config = require("config");

const app = require("./app");

const { port } = config.get("app");

const server = http.createServer(app);

server.listen({ port }, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
