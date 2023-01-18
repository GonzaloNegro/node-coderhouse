import express from 'express';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const app = express();

const argumentos = minimist(process.argv.slice(2));
const PORT = argumentos.puerto || 8080;

const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;

if (clusterMode && cluster.isPrimary) {
  console.log('Ejecutando modo cluster');
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {

  app.get('/', (req, res) => {
    console.log('Resolving / endpoint');
    res.json({
      pid: process.pid,
      msg: `HOLA desde puerto ${PORT}`,
    });
  });
  
  app.get('/info', (req, res) => {
      try {
        const finalObject = {
          directorioActual: process.cwd(),
          idProceso: process.pid,
          versionNode: process.version,
          tituloProceso: process.title,
          sistemaOperativo: process.platform,
          usoMemoria: process.memoryUsage(),
        };
        console.log(finalObject);
        res.status(200).json({
          data: finalObject,
        });
      } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
      }
  });

  app.listen(PORT, () =>
    console.log(
      `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
    )
  );
}
