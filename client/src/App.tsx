import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import IndexPage from "./components/index-page";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <IndexPage />
    </QueryClientProvider>
  );
};

export default App;
