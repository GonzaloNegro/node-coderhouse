import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userCollection = 'users';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = model(userCollection, UserSchema);
