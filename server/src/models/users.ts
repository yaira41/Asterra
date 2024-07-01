import pool from "../config/db";
import { createUserHobbies } from "./hobbies";

type User = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

type DBUser = {
  id?: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
};

const getUsers = async (): Promise<User[]> => {
  const result = await pool.query(`SELECT * FROM "YAIR_AVIVI".users`);
  const users: User[] = result.rows.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    address: row.address,
    phoneNumber: row.phone_number,
  }));

  return users;
};

const getUserById = async (id: number): Promise<User> => {
  const result = await pool.query(
    `SELECT * FROM "YAIR_AVIVI".users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const createUser = async (user: User): Promise<User> => {
  const { firstName, lastName, address, phoneNumber } = user;
  const result = await pool.query(
    `INSERT INTO "YAIR_AVIVI".users (first_name, last_name, address, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, address, phoneNumber]
  );

  createUserHobbies(result.rows[0].id);
  return result.rows[0];
};

const deleteUser = async (id: number): Promise<User> => {
  const result = await pool.query(
    `DELETE FROM "YAIR_AVIVI".users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export { getUsers, getUserById, createUser, deleteUser };
