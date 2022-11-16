import moment from "moment";

export const formatMessages = (data) => {
  const { email, message } = data;
  return {
    email,
    message,
    time: moment().format(),
  };
};