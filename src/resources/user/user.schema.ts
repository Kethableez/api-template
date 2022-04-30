import mongoose, { Schema } from "mongoose";
import User from "./model/user.model";

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>("UserSchema", UserSchema);
