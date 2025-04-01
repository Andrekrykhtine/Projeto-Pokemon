import { QueryClient, QueryClientProvider }from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import AppRoutes from "./routes";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";

const queryClient = new QueryClient();

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <GlobalStyle />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default App;