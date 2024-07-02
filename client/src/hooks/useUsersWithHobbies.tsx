import { useQuery } from "@tanstack/react-query";
import { getUsersWithHobbies } from "../api/endpoints/user";
import { UserWithHobbies } from "../types/user";

export const useUsersWithHobbies = () => {
  const queryKey = ["usersWithHobbies"] as const;
  console.log("userssssssssss");

  return useQuery<UserWithHobbies[], Error>({
    queryKey,
    queryFn: getUsersWithHobbies,
  });
};
