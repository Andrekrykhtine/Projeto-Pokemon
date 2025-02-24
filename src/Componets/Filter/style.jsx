import styled from 'styled-components';

export const TypeFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1px;
`;

export const TypeButton = styled.button`
  padding: 2px;
  background-color: ${({ selected }) => (selected ? '#007bff' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  text-align: left;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#ddd')};
  }
`;