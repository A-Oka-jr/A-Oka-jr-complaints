import clientRepository from "../repositories/ClientRepository.js";
import errorHandler from "../utils/error.js";

class ClientService {
  async getAll() {
    try {
      return await clientRepository.getAll();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await clientRepository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async create(clientData) {
    try {
      const client = await clientRepository.findByEmail(clientData.email);
      if (client) {
        throw errorHandler(400, "client already exists");
      }
      const result = await clientRepository.create(clientData);
      return result;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async update(id, clientData) {
    try {
      const client = await clientRepository.findById(id);
      if (!client) {
        throw errorHandler(404, "client not found");
      }

      const updatedclient = await clientRepository.update(id, clientData);
      return updatedclient;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const client = await clientRepository.findById(id);

      if (!client) {
        throw errorHandler(404, "User not found");
      }

      return await clientRepository.delete(id);
    } catch (error) {
      console.log(error.message);
      user;
      throw error;
    }
  }
}
export default new ClientService();
