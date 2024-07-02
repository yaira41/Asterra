import { NewHobby } from "../../types/hobbies";
import apiClient from "../config";

export const getHobbies = async () => {
  try {
    const { data } = await apiClient.get("/hobbies");
    return data;
  } catch (error) {
    throw error;
  }
};

export const addHobby = async (hobby: NewHobby) => {
  try {
    const { data } = await apiClient.post("/hobbies", hobby);
    return data;
  } catch (error) {
    throw error;
  }
};
