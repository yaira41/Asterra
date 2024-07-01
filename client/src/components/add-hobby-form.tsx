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
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";

const AddHobbyForm: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [hobby, setHobby] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const addHobbyMutation = useAddHobby();

  const { data: users, isLoading: isUsersLoading } = useUsers();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addHobbyMutation.mutate(
      { userId: selectedUserId, hobby },
      {
        onSuccess: () => {
          setSelectedUserId("");
          setHobby("");
        },
      }
    );
  };

  useEffect(() => {
    setIsFormValid(selectedUserId !== "" && hobby.trim() !== "");
  }, [selectedUserId, hobby]);

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
              users?.map((user: User) => (
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
    </Container>
  );
};

export default AddHobbyForm;
