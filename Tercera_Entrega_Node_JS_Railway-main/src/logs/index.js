import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    fileAppenderWarn: { type: "file", filename: "./logs/warn.log" },
    fileAppenderError: { type: "file", filename: "./logs/error.log" },
  },
  categories: {
    default: { appenders: ["console"], level: "info" },
    myLoggerWarn: { appenders: ["fileAppenderWarn"], level: "warn" },
    myLoggerError: { appenders: ["fileAppenderError"], level: "error" },
  },
});

export const infoLogger = log4js.getLogger("default");
export const warnLogger = log4js.getLogger("myLoggerWarn");
export const errorLogger = log4js.getLogger("myLoggerError");
