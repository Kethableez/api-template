import CreateUserPayload from "./model/create-user-payload.model";
import userSchema from "./user.schema";
import Response from "../../utils/models/response.model";
import bcryptjs from "bcryptjs";

class UserService {
  private user = userSchema;

  public async createUser(payload: CreateUserPayload): Promise<Response | Error> {
    try {
      const hashedPassword = await bcryptjs.hash(payload.password, 10);
      const user = await this.user.create({
        username: payload.username,
        password: hashedPassword,
      });

      return {
        message: "User created successfully",
        object: user,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
