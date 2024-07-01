import { useQuery } from "@tanstack/react-query";
import { getHobbies } from "../api/endpoints/hobbies";
import { Hobby } from "../types/hobbies";

const useHobbies = () => {
  const queryKey = ["hobbies"] as const;
  return useQuery<Hobby[], Error, Hobby[]>({
    queryKey,
    queryFn: getHobbies,
  });
};

export default useHobbies;
