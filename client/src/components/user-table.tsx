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
import useHobbies from "../hooks/useHobbies";
import { useUsers } from "../hooks/useUsers";
import { Hobby } from "../types/hobbies";
import { User } from "../types/user";
import Toaster from "./toaster";

const UserTable: React.FC = () => {
  const { data: hobbies, isLoading: hobbiesLoading } = useHobbies();
  const { data: users, isLoading: usersLoading } = useUsers();
  const [toaster, setToaster] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error",
  });
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

  const handleCloseToaster = () => {
    setToaster({ ...toaster, open: false });
  };

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
