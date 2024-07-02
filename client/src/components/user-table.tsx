import React, { useState } from "react";
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
import { UserWithHobbies } from "../types/user";
import Toaster from "./common/toaster";
import { useUsersWithHobbies } from "../hooks/useUsersWithHobbies";
import useToaster from "../hooks/useToaster";

const UserTable: React.FC = () => {
  console.log("user table rendered");
  const { toaster, setToaster, handleCloseToaster } = useToaster();
  const { data: users, isLoading: usersLoading } = useUsersWithHobbies();
  const deleteUserMutation = useDeleteUser();

  if (usersLoading) return <div>Loading...</div>;

  return (
    <>
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
            {users?.map((user: UserWithHobbies) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <ul>
                    {user.hobbies ? (
                      user.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)
                    ) : (
                      <></>
                    )}
                  </ul>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      deleteUserMutation.mutate(user.id!, {
                        onSuccess: () =>
                          setToaster({
                            open: true,
                            message: "User deleted successfully!",
                            color: "success",
                          }),
                        onError: () =>
                          setToaster({
                            open: true,
                            message: "Failed to delete user!",
                            color: "error",
                          }),
                      })
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster
        message={toaster.message}
        open={toaster.open}
        color={toaster.color}
        onClose={handleCloseToaster}
      />
    </>
  );
};

export default UserTable;
