import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import AddUserForm from "./add-user-form";
import AddHobbyForm from "./add-hobby-form";
import UserTable from "./user-table";

const IndexPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AddUserForm />
          <AddHobbyForm />
        </Grid>
        <Grid item xs={9}>
          <UserTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default IndexPage;
