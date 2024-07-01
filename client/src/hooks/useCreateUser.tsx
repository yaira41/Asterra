import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/user";
import { createUser } from "../api/endpoints/user";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hobbies"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
