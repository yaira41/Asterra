import express from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
  removeUser,
  getUsersWithHObbies,
  getSingleUserWithHObbies,
} from "../controllers/usersController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/withHobbies", getUsersWithHObbies);
router.get("/:id", getSingleUser);
router.get("/withHobbies/:id", getSingleUserWithHObbies);
router.post("/", addUser);
router.delete("/:id", removeUser);

export default router;
