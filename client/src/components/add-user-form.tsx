import React, { useReducer, useEffect, useState } from "react";
import { TextField, Button, Container, CircularProgress } from "@mui/material";
import { useCreateUser } from "../hooks/useCreateUser";
import Toaster from "./toaster";

type UserState = {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  isValid: boolean;
  phoneError: boolean;
};

type UserAction =
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_ADDRESS"; payload: string }
  | { type: "SET_PHONE_NUMBER"; payload: string }
  | { type: "SET_VALIDITY" }
  | { type: "SET_PHONE_ERROR"; payload: boolean }
  | { type: "CLEAR_STATE" };

const initialState: UserState = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  isValid: false,
  phoneError: false,
};

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
    case "SET_VALIDITY":
      const isValid =
        state.firstName.trim() !== "" &&
        state.lastName.trim() !== "" &&
        state.address.trim() !== "" &&
        !state.phoneError;
      return { ...state, isValid };
    case "SET_PHONE_ERROR":
      return { ...state, phoneError: action.payload };
    case "CLEAR_STATE":
      return initialState;
    default:
      return state;
  }
};

const AddUserForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toaster, setToaster] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error",
  });
  const addUserMutation = useCreateUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (state.isValid) {
      addUserMutation.mutate(
        {
          firstName: state.firstName,
          lastName: state.lastName,
          address: state.address,
          phoneNumber: state.phoneNumber,
        },
        {
          onSuccess: () => {
            dispatch({ type: "CLEAR_STATE" });
            setToaster({
              open: true,
              message: "User added successfully!",
              color: "success",
            });
          },
          onError: () =>
            setToaster({
              open: true,
              message: "Failed to add user!",
              color: "error",
            }),
        }
      );
    }
  };

  useEffect(() => {
    const phoneError = !/^[0-9]{9,10}$/.test(state.phoneNumber);
    dispatch({ type: "SET_PHONE_ERROR", payload: phoneError });
    dispatch({ type: "SET_VALIDITY" });
  }, [state.firstName, state.lastName, state.address, state.phoneNumber]);

  const checkPhone = () => {
    return state.phoneError === true && !!state.phoneNumber;
  };

  const handleCloseToaster = () => {
    setToaster({ ...toaster, open: false });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={state.firstName}
          onChange={(e) =>
            dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={state.lastName}
          onChange={(e) =>
            dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={state.address}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={state.phoneNumber}
          onChange={(e) =>
            dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value })
          }
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 10 }}
          error={checkPhone()}
          helperText={checkPhone() ? "Phone number can be 9-10 numbers" : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!state.isValid || addUserMutation.isPending}
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
