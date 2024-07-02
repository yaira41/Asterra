import React, { useState } from "react";
import { TextField, Button, Container, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import useCreateUser from "../hooks/useCreateUser";
import Toaster from "./common/toaster";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

const AddUserForm: React.FC = () => {
  // console.log("add user rendered");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [toaster, setToaster] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error",
  });

  const addUserMutation = useCreateUser();

  const onSubmit = (data: FormData) => {
    addUserMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setToaster({
          open: true,
          message: "User added successfully!",
          color: "success",
        });
      },
      onError: () => {
        setToaster({
          open: true,
          message: "Failed to add user!",
          color: "error",
        });
      },
    });
  };

  const handleCloseToaster = () => {
    setToaster({ ...toaster, open: false });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          {...register("firstName", { required: true })}
          error={!!errors.firstName}
          helperText={errors.firstName ? "First Name is required" : ""}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          {...register("lastName", { required: true })}
          error={!!errors.lastName}
          helperText={errors.lastName ? "Last Name is required" : ""}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          {...register("address", { required: true })}
          error={!!errors.address}
          helperText={errors.address ? "Address is required" : ""}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          {...register("phoneNumber", {
            required: true,
            pattern: /^[0-9]{9,10}$/,
          })}
          error={!!errors.phoneNumber}
          helperText={
            errors.phoneNumber ? "Phone number must be 9-10 digits" : ""
          }
          inputProps={{ maxLength: 10 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || !isValid || addUserMutation.isPending}
        >
          {addUserMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            "Add User"
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

export default AddUserForm;
