import log4js from 'log4js';

log4js.configure({
  appenders: {
    consola: { type: 'console' }
  },
  categories: {
    default: { appenders: ['consola'], level: 'info' },
  },
});

export const logger = log4js.getLogger();