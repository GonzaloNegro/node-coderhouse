const fs = require("fs");

class Message {
  constructor(fileName) {
    this.fileName = fileName || null;
  }

  async validateExistFile() {
    try {
      await fs.promises.stat(this.fileName);
      return true;
    } catch (error) {
      console.log("El archivo no existe! Creandolo...");
      await fs.promises.writeFile(this.fileName, JSON.stringify([]));
      return false;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener los mensajes!", error);
    }
  }

  async saveMessage(message) {
    try {
      const messages = await this.getAll();

      const newMessage = {
        email: message.email,
        time: message.time,
        message: message.message,
      };

      messages.push(newMessage);

      await this.saveMessages(messages);
    } catch (error) {
      throw new Error(
        "Hubo un problema al guardar el mensaje ingresado!",
        error
      );
    }
  }

  async saveMessages(messages) {
    try {
      const data = JSON.stringify(messages, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo guardar los mensajes!", error);
    }
  }
}

const messageObj = new Message();

module.exports = messageObj;