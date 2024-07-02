import { HobbyDB } from "../models/hobbies";

export const convertHobbyDB = (hobbyDb: HobbyDB) => ({
  userId: hobbyDb.user_id,
  hobbies: hobbyDb.hobbies,
});