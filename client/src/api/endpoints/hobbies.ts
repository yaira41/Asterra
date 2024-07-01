import apiClient from "../config";

export const getHobbies = async () => {
  const { data } = await apiClient.get("/hobbies");
  return data;
};

export const addHobby = async (hobby: { userId: string; hobby: string }) => {
  const { data } = await apiClient.post("/hobbies", hobby);
  return data;
};
