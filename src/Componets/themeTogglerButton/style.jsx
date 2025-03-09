import { Button } from "../UI/Button/Button";
import styled from "styled-components";

export const StyledThemeButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 10px 12px;
  border-radius: 20px;
  font-size: 2.5rem;
  background-color: ${(props) => props.theme.backgroundButton};
  color: ${(props) => props.theme.colorButton};
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
      @media (max-width: 400px) {
     font-size: 1.5rem;
  }
`;