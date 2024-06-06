import authService from "../services/AuthService.js";

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json("User created successfully");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { rest, token } = await authService.login(email, password);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async signout(req, res, next) {
    try {
      res.clearCookie("access_token");
      res.status(200).json("user has been loged out");
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

export default new AuthController();
