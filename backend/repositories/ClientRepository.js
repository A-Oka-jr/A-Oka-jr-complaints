import Client from "../models/Client.js";

class ClientRepository {
  async create(userData) {
    const user = await Client.create(userData);
    return await user.save();
  }

  async findById(id) {
    return await Client.findById(id);
  }

  findByEmail(email) {
    return Client.findOne({ email });
  }

  async getAll() {
    return await Client.find();
  }

  async update(id, userData) {
    return await Client.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await Client.findByIdAndDelete(id);
  }
}

export default new ClientRepository();
