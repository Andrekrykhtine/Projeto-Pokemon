import styled from "styled-components";

export const Buttons = styled.button`
  padding: 9px 18px;
  font-size: 0.6rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.backgroundColor : theme.hoverBackgroundColor};
  }
`;