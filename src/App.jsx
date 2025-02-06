import { QueryClient, QueryClientProvider } from "react-query"
import MainPage  from "./pages/MainPage/index.jsx";
import { ListPokemon } from "./Componets/pokemons.jsx";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
      <ListPokemon />
    </ QueryClientProvider>
  )
}

export default App
