import mongoose, { Schema } from "mongoose";
import TokenStorage from "./model/token-storage.model";

const TokenStorageSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  revokedAt: { type: Date },
  replaced: { type: String },
});

export default mongoose.model<TokenStorage>("TokenStorage", TokenStorageSchema);
