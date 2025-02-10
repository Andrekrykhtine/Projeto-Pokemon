import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PokemonProperties from "./Componets/PokemonProperties/PokemonProperities";



const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pokemon/:id" element={<PokemonProperties />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    );
  };
  
  export default AppRoutes;