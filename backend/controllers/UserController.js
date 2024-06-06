import AuthService from "../services/AuthService.js";
import userService from "../services/UserService.js";
import errorHandler from "../utils/error.js";

class UserConroller {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }

      return res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await AuthService.register(userData);
      return res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await userService.updateUser(id, userData);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      return res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserConroller();
