import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/endpoints/user";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersWithHobbies"] });
    },
  });
};

export default useDeleteUser;
