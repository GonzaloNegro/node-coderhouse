import "dotenv/config";
import server from "./services/server.js";
import { initDb } from "./db/db.js";
import { infoLogger, errorLogger } from "./logs/index.js";

const init = async () => {
  await initDb();
  const port = process.env.PORT || 8080;

  server.listen(port, () =>
    infoLogger.info(
      `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
    )
  );

  server.on("error", (error) => {
    errorLogger.error("Catch de error en servidor!", error);
  });
};

init();
