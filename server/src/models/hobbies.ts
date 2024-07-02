import pool from "../config/db";
import { convertHobbyDB } from "../utils/convertions.utils";

export type Hobby = {
  userId: number;
  hobbies: string[];
};

export type HobbyDB = {
  user_id: number;
  hobbies: string[];
};

type NewHobby = {
  userId: number;
  hobby: string;
};

const getHobbies = async (): Promise<Hobby[]> => {
  const result = await pool.query(`SELECT * FROM "YAIR_AVIVI".hobbies`);

  const hobbies: Hobby[] = result.rows.map(convertHobbyDB);
  return hobbies;
};

const getHobbiesByUserId = async (userId: number): Promise<Hobby> => {
  const result = await pool.query(
    `SELECT * FROM "YAIR_AVIVI".hobbies WHERE user_id = $1`,
    [userId]
  );

  return convertHobbyDB(result.rows[0]);
};

const createUserHobbies = async (userId: number): Promise<boolean> => {
  const result = await pool.query(
    `INSERT INTO "YAIR_AVIVI".hobbies (user_id) VALUES ($1) RETURNING *`,
    [userId]
  );

  if (result.rows) return true;
  return false;
};

const createHobby = async (newHobby: NewHobby): Promise<Hobby> => {
  const { userId, hobby } = newHobby;

  const userHobbies = await getHobbiesByUserId(userId);
  const currentHobbies = userHobbies?.hobbies || [];
  currentHobbies.push(hobby);

  const result = await pool.query(
    `UPDATE "YAIR_AVIVI".hobbies SET hobbies = $2 WHERE user_id = $1 RETURNING *`,
    [userId, currentHobbies]
  );

  return convertHobbyDB(result.rows[0]);
};

export { getHobbies, getHobbiesByUserId, createUserHobbies, createHobby };
