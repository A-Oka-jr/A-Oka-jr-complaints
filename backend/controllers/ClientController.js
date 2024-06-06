import clientService from "../services/ClientService.js";
import errorHandler from "../utils/error.js";

class ClientConroller {
  async getAll(req, res) {
    try {
      const clients = await clientService.getAll();
      return res.status(200).json({ success: true, clients });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const client = await clientService.getById(id);
      if (!client) {
        return next(errorHandler(404, "Client not found"));
      }

      return res.status(200).json({ success: true, client });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const clientData = req.body;
      const client = await clientService.create(clientData);
      return res.status(201).json({ success: true, client });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const clientData = req.body;
      const client = await clientService.update(id, clientData);
      return res.status(200).json({ success: true, client });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const client = await clientService.delete(id);
      return res.status(200).json({ success: true, message: "Client deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ClientConroller();
