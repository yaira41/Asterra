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
  return (
  );
};

export default UserTable;
