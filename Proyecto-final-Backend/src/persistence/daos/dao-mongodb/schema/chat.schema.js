import { Schema, model } from 'mongoose';

const ChatCollection = 'messajes';

const ChatSchema = new Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
},
{ timestamps: true }
);

const ChatModel = model(ChatCollection, ChatSchema);

export default ChatModel;