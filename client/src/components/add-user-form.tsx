import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useCreateUser } from "../hooks/useCreateUser";

const AddUserForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const addUserMutation = useCreateUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addUserMutation.mutate({ firstName, lastName, address, phoneNumber });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>
    </Container>
  );
};

export default AddUserForm;
