import express from 'express';
import log4js from 'log4js';

const app = express();

const PORT = 8080;

log4js.configure({
  appenders: {
    console: { type: 'console' },
    fileAppenderWarn: { type: 'file', filename: './logs/warn.log' },
    fileAppenderError: { type: 'file', filename: './logs/error.log' },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    myLoggerWarn: { appenders: ['fileAppenderWarn'], level: 'warn' },
    myLoggerError: { appenders: ['fileAppenderError'], level: 'error' },
  },
});

const logger = log4js.getLogger();

app.get('/', (req, res) => {
  logger.info(`localhost:${PORT}`);
  logger.info(`${req.route} - ${req.method}`);
  res.json({
    pid: process.pid,
    msg: 'HOLA',
  });
});
  
app.get('/slow', function (req, res) {
  logger.info(`localhost:${PORT}/slow`);
  logger.info(`${req.route} - ${req.method}`);
  let sum = 0;
  for (let i = 0; i < 15006500445; i++) {
    sum += i;
  }
  res.json({
    pid: process.pid,
    sum,
  });
});
  
app.get('/home', (req, res) => {
  logger.info(`localhost:${PORT}/home`);
  logger.info(`${req.route} - ${req.method}`);
  try{
    throw 'esto es un error!';
    res.json({ msg: 'Bienvenido!' });
  } catch(error) {
    logger.error(error);
    res.status(500).json({
      error: error
    });
  }
});

app.use((req, res) => {
  logger.warn(`${req.url}`);
  logger.info(`${req.route} - ${req.method}`);
  return res.status(404).json({
    descripcion: `ruta ${req.url} no implementada`,
  });
});

app.listen(PORT, () =>
  logger.info(
    `Servidor express escuchando en el puerto ${PORT}`
  )
);


