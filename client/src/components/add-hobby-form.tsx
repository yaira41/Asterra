import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import useAddHobby from "../hooks/useAddHobbie";
import { UserWithHobbies } from "../types/user";
import Toaster from "./toaster";
import { useUsersWithHobbies } from "../hooks/useUsersWithHobbies";

const AddHobbyForm: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [hobby, setHobby] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [toaster, setToaster] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error",
  });
  const addHobbyMutation = useAddHobby();

  const { data: users, isLoading: isUsersLoading } = useUsersWithHobbies();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addHobbyMutation.mutate(
      { userId: selectedUserId, hobby },
      {
        onSuccess: () => {
          setSelectedUserId("");
          setHobby("");
          setToaster({
            open: true,
            message: "Hobby added successfully!",
            color: "success",
          });
        },
        onError: () => {
          setToaster({
            open: true,
            message: "Failed to add hobby!",
            color: "error",
          });
        },
      }
    );
  };

  useEffect(() => {
    setIsFormValid(selectedUserId !== "" && hobby.trim() !== "");
  }, [selectedUserId, hobby]);

  const handleCloseToaster = () => {
    setToaster({ ...toaster, open: false });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            labelId="user-select-label"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value as string)}
          >
            {isUsersLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              users?.map((user: UserWithHobbies) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <TextField
          label="Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid || addHobbyMutation.isPending}
        >
          {addHobbyMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            "Add Hobby"
          )}
        </Button>
      </form>
      <Toaster
        message={toaster.message}
        open={toaster.open}
        color={toaster.color}
        onClose={handleCloseToaster}
      />
    </Container>
  );
};

export default AddHobbyForm;
