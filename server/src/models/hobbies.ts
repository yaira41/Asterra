import pool from "../config/db";

export type Hobby = {
  userId: number;
  hobbies: string[];
};

type NewHobby = {
  userId: number;
  hobby: string;
};

const getHobbies = async (): Promise<Hobby[]> => {
  const result = await pool.query(`SELECT * FROM "YAIR_AVIVI".hobbies`);

  const hobbies: Hobby[] = result.rows.map((hobby) => ({
    userId: hobby.user_id,
    hobbies: hobby.hobbies,
  }));
  return hobbies;
};

const getHobbiesByUserId = async (userId: number): Promise<Hobby> => {
  const result = await pool.query(
    `SELECT * FROM "YAIR_AVIVI".hobbies WHERE user_id = $1`,
    [userId]
  );

  const hobby: Hobby = {
    userId: result.rows[0].user_id,
    hobbies: result.rows[0].hobbies,
  };
  return hobby;
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

  const addedHobby: Hobby = {
    userId: result.rows[0].user_id,
    hobbies: result.rows[0].hobbies,
  };
  return addedHobby;
};

const deleteHobby = async (user_id: number): Promise<Hobby> => {
  const result = await pool.query(
    `DELETE FROM "YAIR_AVIVI".hobbies WHERE user_id = $1 RETURNING *`,
    [user_id]
  );
  const hobby: Hobby = {
    userId: result.rows[0].user_id,
    hobbies: result.rows[0].hobbies,
  };
  return hobby;
};

export {
  getHobbies,
  getHobbiesByUserId,
  createUserHobbies,
  createHobby,
  deleteHobby,
};
