import { Button } from "../Button/Button";
import styled from "styled-components";

export const StyledThemeButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${props => 
    props.isDarkMode 
      ? "#f1c40f" // cor para o botão "Modo Claro" 
      : "#2c3e50"  // cor para o botão "Modo Escuro"
  };
  color: ${props => 
    props.isDarkMode 
      ? "#2c3e50"  // cor do texto para o botão "Modo Claro"
      : "#f1c40f"  // cor do texto para o botão "Modo Escuro"
  };
  border: none;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(0);
  }
`;