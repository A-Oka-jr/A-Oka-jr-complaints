import Complaint from "../models/Complaint.js";

class ClientRepository {
  async create(complaintData) {
    const complaint = await Complaint.create(complaintData);
    return complaint;
  }

  async findById(id) {
    return await Complaint.findById(id)
      .populate("userRef", "name email")
      .populate("clientRef", "name email location");
  }

  async getAll() {
    return await Complaint.find()
      .populate("userRef", "name email")
      .populate("clientRef", "name email location")
      .sort({ createdAt: -1 });
  }

  async update(id, complaintData) {
    return await Complaint.findByIdAndUpdate(id, complaintData, { new: true })
      .populate("userRef", "name email")
      .populate("clientRef", "name email location");
  }

  async delete(id) {
    return await Complaint.findByIdAndDelete(id);
  }

  async getByUserId(userRef) {
    const complaints = await Complaint.find({ userRef: userRef })
      .populate("userRef", "name email")
      .populate("clientRef", "name email location");
    return complaints;
  }

  async getByClientId(clientRef) {
    return await Complaint.find({ clientRef: clientRef })
      .populate("userRef", "name email")
      .populate("clientRef", "name email location");
  }
}

export default new ClientRepository();
