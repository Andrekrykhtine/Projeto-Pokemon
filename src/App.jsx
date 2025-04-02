import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import AppRoutes from "./routes/routes";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <GlobalStyle />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeContextProvider>
    </ QueryClientProvider>
  )
}

export default App
