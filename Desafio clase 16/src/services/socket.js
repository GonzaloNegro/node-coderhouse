import { formatMessages } from "../utils/messages.js";
import { DBService } from "../classes/db.js";
import { Server } from "socket.io";

let productsTable = "products";
let messagesTable = "messages";

const productData = {
  title: undefined,
  value: undefined,
  thumbnail: undefined,
};

let io;

export const initWsServer = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("NewConnection", async () => {
      socket.emit("welcome", "Bienvenido!");
    });

    //Listen for new product
    socket.on("addProduct", async (newProduct) => {
      productData.title = newProduct.title;
      productData.value = newProduct.value;
      productData.thumbnail = newProduct.thumbnail;
      const newId = await DBService.create(productsTable, productData);
      const productAdded = await DBService.getById(productsTable, newId);
      io.emit("lastProduct", productData);
    });

    //Listen for chat messages
    socket.on("sendMesssage", async (message) => {
      io.emit("lastMessage", formatMessages(message));

      try {
        const newId = await DBService.create(
          messagesTable,
          formatMessages(message)
        );
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

export const getWsServer = () => {
  return io;
};