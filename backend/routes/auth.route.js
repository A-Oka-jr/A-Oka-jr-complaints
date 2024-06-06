import { Router } from "express";
import authController from "../controllers/AuthController.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/signout", authController.signout);

export default router;
