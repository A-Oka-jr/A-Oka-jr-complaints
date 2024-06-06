import complaintService from "../services/ComplaintService.js";
import errorHandler from "../utils/error.js";

class ComplaintController {
  async getAll(req, res) {
    try {
      const complaints = await complaintService.getAll();
      return res.status(200).json({ success: true, complaints });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const complaint = await complaintService.getById(id);
      if (!complaint) {
        return next(errorHandler(404, "complaint not found"));
      }

      return res.status(200).json({ success: true, complaint });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const complaintData = req.body;
      const complaint = await complaintService.create(complaintData);
      return res.status(201).json({ success: true, complaint });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const complaintData = req.body;
      const complaint = await complaintService.update(id, complaintData);
      return res.status(200).json({ success: true, complaint });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const complaint = await complaintService.delete(id);
      return res
        .status(200)
        .json({ success: true, message: "complaint deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByUserId(req, res) {
    const userRef = req.params.userId;
    try {
      const complaints = await complaintService.getByUserId(userRef);
      return res.status(200).json({ success: true, complaints });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByClientId(req, res) {
    try {
      const clientRef = req.params.clientId;
      const complaints = await complaintService.getByClientId(clientRef);
      return res.status(200).json({ success: true, complaints });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ComplaintController();
