import mongoose, { Schema } from "mongoose";
import TokenStorage from "./model/token-storage.model";

/**
 * @openapi
 * components:
 *  schemas:
 *    TokenStorage:
 *      type: object
 *      required:
 *        - userId
 *        - token
 *        - expiresAt
 *        - createdAt
 *      properties:
 *        userId:
 *          type: string
 *        token:
 *          type: string
 *        expiresAt:
 *          type: string
 *          format: date-time
 *        createdAt:
 *          type: string
 *          format: date-time
 *        revokedAt:
 *          type: string
 *          format: date-time
 *        replaced:
 *          type: string
 */
const TokenStorageSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  revokedAt: { type: Date },
  replaced: { type: String },
});

export default mongoose.model<TokenStorage>("TokenStorage", TokenStorageSchema);
