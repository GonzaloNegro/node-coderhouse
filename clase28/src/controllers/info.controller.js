import { args } from "../index.js";

export const infoApi = async (req, res) => {
  try {
    const finalObject = {
      args: args,
      directorioActual: process.cwd(),
      idProceso: process.pid,
      versionNode: process.version,
      tituloProceso: process.title,
      sistemaOperativo: process.platform,
      usoMemoria: process.memoryUsage(),
    };
    res.status(200).json({
      data: finalObject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};
