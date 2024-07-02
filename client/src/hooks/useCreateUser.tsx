import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/user";
import { createUser } from "../api/endpoints/user";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersWithHobbies"] });
    },
  });
};

export default useCreateUser;
