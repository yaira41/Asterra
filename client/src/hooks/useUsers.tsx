import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/endpoints/user";
import { User } from "../types/user";

const useUsers = () => {
  const queryKey = ["users"] as const;

  return useQuery<User[], Error>({
    queryKey,
    queryFn: getUsers,
  });
};

export default useUsers;
