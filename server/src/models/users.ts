import pool from "../config/db";

type User = {
  id?: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
};

const getUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id: number): Promise<User> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

