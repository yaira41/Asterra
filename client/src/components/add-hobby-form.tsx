import React, { useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import useAddHobby from "../hooks/useAddHobby";
import { UserWithHobbies } from "../types/user";
import Toaster from "./common/toaster";
import useUsersWithHobbies from "../hooks/useUsersWithHobbies";
import useToaster from "../hooks/useToaster";

interface FormData {
  selectedUserId: string;
  hobby: string;
}

const AddHobbyForm: React.FC = () => {
  console.log("add hobby");

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isValid, isDirty },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { selectedUserId: "", hobby: "" },
  });

  const { toaster, setToaster, handleCloseToaster } = useToaster();
  const addHobbyMutation = useAddHobby();
  const { data: users, isLoading: isUsersLoading } = useUsersWithHobbies();

  const onSubmit = (data: FormData) => {
    const currentUser = users?.find((x) => x.id === +data.selectedUserId);
    if (!currentUser?.hobbies?.includes(data.hobby)) {
      addHobbyMutation.mutate(
        { userId: +data.selectedUserId, hobby: data.hobby },
        {
          onSuccess: () => {
            reset();
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
    } else {
      setToaster({
        open: true,
        message: `The hobby already exists for ${currentUser?.firstName} ${currentUser?.lastName}!`,
        color: "error",
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-select-label">User</InputLabel>
          <Controller
            name="selectedUserId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="user-select-label"
                onChange={(e) => field.onChange(e.target.value as string)}
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
            )}
          />
        </FormControl>
        <TextField
          label="Hobby"
          {...register("hobby", { required: true })}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || !isValid || addHobbyMutation.isPending}
        >
          {addHobbyMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            "Add Hobby"
          )}
        </Button>
      </form>
      {toaster.open && (
        <Toaster
          message={toaster.message}
          open={toaster.open}
          color={toaster.color}
          onClose={handleCloseToaster}
        />
      )}
    </Container>
  );
};

export default AddHobbyForm;
