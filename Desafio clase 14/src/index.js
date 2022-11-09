import Server from "./services/server.js";

const port = 8080;

Server.listen(port, () => console.log("Server up en puerto", port));

Server.on("error", (error) => {
  console.log("Catch de error en servidor!", error);
});