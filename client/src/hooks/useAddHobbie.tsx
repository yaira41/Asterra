import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHobby } from "../api/endpoints/hobbies";

const useAddHobby = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addHobby,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersWithHobbies"] });
    },
  });
};

export default useAddHobby;
