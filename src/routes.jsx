import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";



const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    );
  };
  
  export default AppRoutes;