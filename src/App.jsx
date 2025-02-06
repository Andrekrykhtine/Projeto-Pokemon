import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./styles/Theme";
import { GlobalStyle } from "./styles/global";
import AppRoutes from "./routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <GlobalStyle />
        <Router>
        
            <AppRoutes />
          
        </Router>
      </Theme>
    </ QueryClientProvider>
  )
}

export default App
