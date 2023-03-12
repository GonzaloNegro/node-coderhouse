import Koa from "koa";
import koaBody from "koa-body";
import mainRouter from "./routes/index.js";

const app = new Koa();

app.use(koaBody());
app.use(mainRouter);

const PORT = 8080;

const server = app.listen(PORT, () =>
  console.info(`Server Koa iniciado en http://localhost:${PORT}`)
);

server.on("error", (error) => console.log("Error en Servidor Koa:", error));
