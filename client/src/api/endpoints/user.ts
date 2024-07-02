import { User, UserWithHobbies } from "../../types/user";
import apiClient from "../config";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersWithHobbies = async (): Promise<UserWithHobbies[]> => {
  try {
    const response = await apiClient.get<UserWithHobbies[]>(
      "/users/WithHobbies"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await apiClient.post<User>("/users", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.delete<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
