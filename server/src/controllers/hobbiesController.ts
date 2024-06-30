import { Request, Response } from "express";
import {
  getHobbies,
  getHobbiesByUserId,
  createHobby,
  deleteHobby,
} from "../models/hobbies";

const getAllHobbies = async (req: Request, res: Response) => {
  try {
    const hobbies = await getHobbies();
    res.status(200).json(hobbies);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const getHobbiesForUser = async (req: Request, res: Response) => {
  try {
    const hobbies = await getHobbiesByUserId(Number(req.params.userId));
    res.status(200).json(hobbies);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const addHobby = async (req: Request, res: Response) => {
  try {
    const hobby = await createHobby(req.body);
    res.status(201).json(hobby);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const removeHobby = async (req: Request, res: Response) => {
  try {
    const hobby = await deleteHobby(Number(req.params.userId));
    if (hobby) {
      res.status(200).json(hobby);
    } else {
      res.status(404).json({ message: "Hobby not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export { getAllHobbies, getHobbiesForUser, addHobby, removeHobby };
