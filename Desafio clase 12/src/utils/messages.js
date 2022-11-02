const moment = require("moment");

const formatMessages = (data) => {
  const { email, message } = data;
  return {
    email,
    message,
    time: moment().format("DD-MM-YYYY HH:MM:SS"),
  };
};

module.exports = {
  formatMessages,
};