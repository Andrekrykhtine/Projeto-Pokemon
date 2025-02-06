import { QueryClient, QueryClientProvider } from "react-query"
import  { ListPokemon } from "./Componets/pokemons.jsx"
function App() {
const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ListPokemon />
   
    </ QueryClientProvider>
  )
}

export default App
