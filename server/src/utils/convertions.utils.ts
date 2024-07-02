import { HobbyDB } from "../models/hobbies";
import { UserDB, UserDBWithHobbies } from "../models/users";

export const convertHobbyDB = (hobbyDb: HobbyDB) => ({
  userId: hobbyDb.user_id,
  hobbies: hobbyDb.hobbies,
});

export const convertUserDB = (userDb: UserDB) => ({
  id: userDb.id,
  firstName: userDb.first_name,
  lastName: userDb.last_name,
  address: userDb.address,
  phoneNumber: userDb.phone_number,
});

export const convertUserDBWithHobbies = (
  userDBWithHobbies: UserDBWithHobbies
) => ({
  id: userDBWithHobbies.id,
  firstName: userDBWithHobbies.first_name,
  lastName: userDBWithHobbies.last_name,
  address: userDBWithHobbies.address,
  phoneNumber: userDBWithHobbies.phone_number,
  hobbies: userDBWithHobbies.hobbies,
});
