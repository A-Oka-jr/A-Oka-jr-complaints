import complaintRepository from "../repositories/ComplaintRepository.js";
import errorHandler from "../utils/error.js";

class ComplaintService {
  async getAll() {
    try {
      return await complaintRepository.getAll();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await complaintRepository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async create(complaintData) {
    try {
      const complaint = await complaintRepository.create(complaintData);
      return complaint;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async update(id, complaintData) {
    try {
      const complaint = await complaintRepository.findById(id);
      if (!complaint) {
        throw errorHandler(404, "complaint not found");
      }

      const updatedcomplaint = await complaintRepository.update(
        id,
        complaintData
      );
      return updatedcomplaint;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const complaint = await complaintRepository.findById(id);

      if (!complaint) {
        throw errorHandler(404, "complaint not found");
      }

      return await complaintRepository.delete(id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getByUserId(userRef) {
    try {
      return await complaintRepository.getByUserId(userRef);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getByClientId(clientRef) {
    try {
      return await complaintRepository.getByClientId(clientRef);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
export default new ComplaintService();
