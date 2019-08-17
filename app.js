const client = require("./src/client/client.js");
const server = require("./src/server/server.js");
const { serverPort, clientPort } = require("./port-config.json");

client.listen(clientPort, () => {
  console.log(`Client listen as port ${clientPort}`);
});
server.listen(serverPort, () => {
  console.log(`Server listen as port ${serverPort}`);
});
