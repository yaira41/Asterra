import express from "express";
import {
  getAllHobbies,
  getHobbiesForUser,
  addHobby,
} from "../controllers/hobbiesController";

const router = express.Router();

router.get("/", getAllHobbies);
router.get("/:userId", getHobbiesForUser);
router.post("/", addHobby);

export default router;
