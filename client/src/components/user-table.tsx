import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import useDeleteUser from "../hooks/useDeleteUser";
import useHobbies from "../hooks/useHobbies";
import { useUsers } from "../hooks/useUsers";
import { Hobby } from "../types/hobbies";
import { User } from "../types/user";

const UserTable: React.FC = () => {
  const { data: hobbies, isLoading: hobbiesLoading } = useHobbies();
  const { data: users, isLoading: usersLoading } = useUsers();
  const deleteUserMutation = useDeleteUser();

  if (usersLoading || hobbiesLoading) return <div>Loading...</div>;

  const getUserHobbies = (userId: number) => {
    const userHobbies = hobbies?.find(
      (userHobbies: Hobby) => userHobbies.user_id === userId
    );
    return userHobbies?.hobbies?.length ? (
      userHobbies.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)
    ) : (
      <></>
    );
  };

  return (
  );
};

export default UserTable;
