import express from 'express';
import minimist from 'minimist';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const argumentos = minimist(process.argv.slice(2));
const PORT = argumentos.puerto || 8080;

console.log(argumentos);
app.listen(PORT, () =>
  console.log(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);

app.get('/api/randoms', (req, res) => {
  console.log('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `Hola desde puerto ${PORT}`,
  });
});

