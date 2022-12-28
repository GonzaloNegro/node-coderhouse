import minimist from "minimist";

const optionalArgsObject = {
  alias: {
    p: "puerto",
  },
  default: {
    p: "8080",
  },
};

const args = minimist(process.argv, optionalArgsObject);

console.log("TRANSFORMACION ARGV CON MINIMIST");
console.log(args);
