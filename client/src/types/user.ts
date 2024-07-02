import { Hobby } from "./hobbies";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

export type UserWithHobbies = User & Pick<Hobby, "hobbies">;
