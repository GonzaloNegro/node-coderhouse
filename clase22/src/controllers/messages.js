import { MessagesModel } from "../models/messages.js";
import { normalize, denormalize, schema } from "normalizr";

const author = new schema.Entity("author", {}, { idAttribute: "id" });

const msg = new schema.Entity(
  "message",
  {
    author: author,
  },
  { idAttribute: "_id" }
);

const msgsSchema = new schema.Array(msg);

export const AllMessages = async (req, res) => {
  try {
    const Messages = await MessagesModel.find().lean();

    if (!Messages) {
      return res.status(400).json({
        mensaje: "No hay mensajes para mostrar",
      });
    } else {
      return res.status(200).json({
        data: Messages,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const NormalizedMessages = async (req, res) => {
  try {
    const messagesOriginalData = await MessagesModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgsSchema);

    return res.status(200).json({
      data: normalizedMessages,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const DenormalizedMessages = async (req, res) => {
  try {
    const messagesOriginalData = await MessagesModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgsSchema);

    const denormalizedData = denormalize(
      normalizedMessages.result,
      msgsSchema,
      normalizedMessages.entities
    );

    return res.status(200).json({
      data: denormalizedData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
