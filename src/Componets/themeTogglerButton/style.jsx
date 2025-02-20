import { Button } from "../Button/Button";
import styled from "styled-components";

export const StyledThemeButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  border-radius: 20px;
  font-size: 2rem;
  background-color: ${props => 
    props.isDarkMode 
      ? "#2c3e50" // cor para o botão "Modo Claro" 
      : "#ff0000"  // cor para o botão "Modo Escuro"
  };
  color: ${props => 
    props.isDarkMode 
      ? "#ff0000"  // cor do texto para o botão "Modo Claro"
      : "#2c3e50"  // cor do texto para o botão "Modo Escuro"
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
    
  }
  
  &:active {
    transform: translateY(0);
  }
`;