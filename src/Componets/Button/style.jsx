import styled from "styled-components";

export const Buttons = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#09f')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#007acc')};
  }
`;