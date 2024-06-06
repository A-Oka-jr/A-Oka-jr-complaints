import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import clientConroller from "../controllers/ClientController.js";

const router = Router();

router.get("/getAll", verifyUser, clientConroller.getAll);
router.get("/getById/:id", verifyUser, clientConroller.getById);
router.post("/create", verifyUser, clientConroller.create);
router.put("/update/:id", verifyUser, clientConroller.update);
router.delete("/delete/:id", verifyUser, clientConroller.delete);

export default router;
