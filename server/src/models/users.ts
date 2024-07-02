import pool from "../config/db";
import {
  convertUserDB,
  convertUserDBWithHobbies,
} from "../utils/convertions.utils";
import { Hobby, createUserHobbies } from "./hobbies";

type User = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

export type UserDB = {
  id?: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
};

type UserWithHobbies = User & Pick<Hobby, "hobbies">;

export type UserDBWithHobbies = UserDB & Pick<Hobby, "hobbies">;

const getUsers = async (): Promise<User[]> => {
  const result = await pool.query(`SELECT * FROM "YAIR_AVIVI".users`);
  const users: User[] = result.rows.map(convertUserDB);
  return users;
};

const getUsersWithHobbies = async (): Promise<UserWithHobbies[]> => {
  const result = await pool.query(`
          SELECT 
            u.id, 
            u.first_name, 
            u.last_name, 
            u.address, 
            u.phone_number, 
            h.hobbies
          FROM "YAIR_AVIVI".users u
          LEFT JOIN "YAIR_AVIVI".hobbies h ON u.id = h.user_id
        `);

  const usersWithHobbies = result.rows.map(convertUserDBWithHobbies);
  return usersWithHobbies;
};

const getUserById = async (id: number): Promise<User> => {
  const result = await pool.query(
    `SELECT * FROM "YAIR_AVIVI".users WHERE id = $1`,
    [id]
  );
  return convertUserDB(result.rows[0]);
};

const getUserWithHobbies = async (
  id: number
): Promise<UserWithHobbies | undefined> => {
  const result = await pool.query(
    `
    SELECT 
      u.id, 
      u.first_name, 
      u.last_name, 
      u.address, 
      u.phone_number, 
      h.hobbies
    FROM "YAIR_AVIVI".users u
    LEFT JOIN "YAIR_AVIVI".hobbies h ON u.id = h.user_id
    WHERE u.id = $1
  `,
    [id]
  );

  const row = result.rows[0];

  if (!row) {
    return undefined;
  }

  return convertUserDBWithHobbies(row);
};

const createUser = async (user: User): Promise<User> => {
  const { firstName, lastName, address, phoneNumber } = user;
  const result = await pool.query(
    `INSERT INTO "YAIR_AVIVI".users (first_name, last_name, address, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, address, phoneNumber]
  );

  const newUser = convertUserDB(result.rows[0]);
  createUserHobbies(newUser.id!);
  return newUser;
};

const deleteUser = async (id: number): Promise<User> => {
  const result = await pool.query(
    `DELETE FROM "YAIR_AVIVI".users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export {
  getUsers,
  getUsersWithHobbies,
  getUserById,
  getUserWithHobbies,
  createUser,
  deleteUser,
};
