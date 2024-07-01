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
    <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <ul>{getUserHobbies(user.id!)}</ul>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteUserMutation.mutate(user.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
