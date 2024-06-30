import express from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
  removeUser,
} from "../controllers/usersController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/", addUser);
router.delete("/:id", removeUser);

export default router;
