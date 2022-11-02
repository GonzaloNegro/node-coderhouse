const server = require("./services/server");
const { initWsServer, getWsServer } = require("./services/socket");

const port = 8080;

const init = async () => {
  initWsServer(server);
  server.listen(port, () => console.log(`Server up port ${port}`));
  server.on("error", (error) => {
    console.log("Server catch!", error);
  });
};

init();