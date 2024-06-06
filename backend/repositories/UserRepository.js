import User from "../models/User.js";

class UserRepository {
  async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  findUserByEmail(email) {
    return User.findOne({ email });
  }

  async getAllUsers() {
    return await User.find();
  }

  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
