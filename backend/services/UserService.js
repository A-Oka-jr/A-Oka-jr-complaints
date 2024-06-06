import userRepository from "../repositories/UserRepository.js";
import errorHandler from "../utils/error.js";

class UserService {
  async getAllUsers() {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await userRepository.findUserById(id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await userRepository.findUserById(id);
      if (!user) {
        throw errorHandler(404, "User not found");
      }

      const updatedUser = await userRepository.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await userRepository.findUserById(id);

      if (!user) {
        throw errorHandler(404, "User not found");
      }

      return await userRepository.deleteUser(id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
export default new UserService();
