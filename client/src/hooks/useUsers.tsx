import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/endpoints/user";
import { User } from "../types/user";

export const useUsers = () => {
  const queryKey = ["users"] as const;
  console.log("userssssssssss");

  return useQuery<User[], Error>({
    queryKey,
    queryFn: getUsers,
  });
};
