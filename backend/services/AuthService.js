import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userRepository from "../repositories/UserRepository.js";
import errorHandler from "../utils/error.js";

class AuthService {
  async register(userData) {
    const { email, password } = userData;
    let user = await userRepository.findUserByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }

    user = await userRepository.createUser(userData);

    return user;
  }

  async login(email, password) {
    try {
      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        throw errorHandler(404, "user not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw errorHandler(404, "wrong email or password");
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const { password: pass, ...rest } = user._doc;

      return { rest, token };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

export default new AuthService();
