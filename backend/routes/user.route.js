import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import userConroller from "../controllers/UserController.js";

const router = Router();

router.get("/getAllUsers", verifyUser, userConroller.getAllUsers);
router.get("/getUserById/:id", verifyUser, userConroller.getUserById);
router.post("/createUser", verifyUser, userConroller.createUser);
router.put("/updateUser/:id", verifyUser, userConroller.updateUser);
router.delete("/deleteUser/:id", verifyUser, userConroller.deleteUser);

export default router;
