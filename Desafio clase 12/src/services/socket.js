const socketIo = require("socket.io");
const path = require("path");
const { productObj, productArray } = require("../classes/product");
const { formatMessages } = require("../utils/messages");
const messageObj = require("../classes/message");

const MessagesFileFolderPath = path.resolve(__dirname, "../../messages.json");

messageObj.fileName = MessagesFileFolderPath;

const productData = {
  title: undefined,
  value: undefined,
  thumbnail: undefined,
};

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("NewConnection", async () => {
      socket.emit("welcome", "Bienvenido!");
    });

    //Listen for new product
    socket.on("addProduct", (newProduct) => {
      productData.title = newProduct.title;
      productData.value = newProduct.value;
      productData.thumbnail = newProduct.thumbnail;
      productObj.saveProduct(productData, productArray);
      io.emit("lastProduct", productArray[productArray.length - 1]);
    });

    //Listen for chat messages
    socket.on("sendMesssage", async (message) => {
      io.emit("lastMessage", formatMessages(message));

      try {
        let exist = await messageObj.validateExistFile();
        if (exist) {
          console.log("El archivo ya existe!");
        }
        await messageObj.saveMessage(formatMessages(message));
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

module.exports = {
  initWsServer,
  getWsServer,
};