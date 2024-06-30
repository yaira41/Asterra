import express from "express";
import {
  getAllHobbies,
  getHobbiesForUser,
  addHobby,
  removeHobby,
} from "../controllers/hobbiesController";

const router = express.Router();

router.get("/", getAllHobbies);
router.get("/:userId", getHobbiesForUser);
router.post("/", addHobby);
router.delete("/:userId", removeHobby);

export default router;
