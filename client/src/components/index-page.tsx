import { Container, Typography, Box } from "@mui/material";
import AddUserForm from "./add-user-form";
import AddHobbyForm from "./add-hobby-form";
import UserTable from "./user-table";

const UserManagement = () => {
  return (
    <Container>
      <Box display="flex" marginBottom={4}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" width="30%">
          <AddUserForm />
          <AddHobbyForm />
        </Box>
        <Box width="68%" marginTop={1.5}>
          <UserTable />
        </Box>
      </Box>
    </Container>
  );
};

export default UserManagement;
