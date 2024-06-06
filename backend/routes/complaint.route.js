import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import complaintController from "../controllers/ComplaintController.js";

const router = Router();

router.get("/getAll", verifyUser, complaintController.getAll);
router.get("/getById/:id", verifyUser, complaintController.getById);
router.get("/getByUserId/:userId", verifyUser, complaintController.getByUserId);
router.get(
  "/getByClientId/:clientId",
  verifyUser,
  complaintController.getByClientId
);
router.post("/create", verifyUser, complaintController.create);
router.put("/update/:id", verifyUser, complaintController.update);
router.delete("/delete/:id", verifyUser, complaintController.delete);

export default router;
