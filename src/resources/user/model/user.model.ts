import { Document } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
}

export default User;
