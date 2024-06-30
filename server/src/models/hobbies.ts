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

const createHobby = async (hobby: Hobby): Promise<Hobby> => {
  const { user_id, hobbies } = hobby;
  const result = await pool.query(
    "INSERT INTO hobbies (user_id, hobbies) VALUES ($1, $2) RETURNING *",
    [user_id, hobbies]
  );
  return result.rows[0];
};

const deleteHobby = async (user_id: number): Promise<Hobby> => {
  const result = await pool.query(
    "DELETE FROM hobbies WHERE user_id = $1 RETURNING *",
    [user_id]
  );
  return result.rows[0];
};

export { getHobbies, getHobbiesByUserId, createHobby, deleteHobby };
