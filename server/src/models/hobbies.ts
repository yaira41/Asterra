import pool from "../config/db";

type Hobby = {
  user_id: number;
  hobbies: string[];
};

const getHobbies = async (): Promise<Hobby[]> => {
  const result = await pool.query("SELECT * FROM hobbies");
  return result.rows;
};

const getHobbiesByUserId = async (userId: number): Promise<Hobby[]> => {
  const result = await pool.query("SELECT * FROM hobbies WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
};

