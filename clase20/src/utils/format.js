import moment from "moment";

export const formatTimeStamp = () => {
  let timestamp = moment().format().toString();
  return timestamp;
};
