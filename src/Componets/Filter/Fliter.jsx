import styled from 'styled-components';
import PropTypes from 'prop-types';

export const TypeFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  wrap: wrap;
`;

export const TypeButton = styled.button`
  padding: 10px;
  background-color: ${({ selected }) => (selected ? '#007bff' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#ddd')};
  }
`;

const TypeFilter = ({ types, selectedType, onSelectType }) => {
  return (
    <TypeFilterContainer>
      {types.map((type) => (
        <TypeButton
          key={type.name}
          onClick={() => onSelectType(type.name)}
          style={{ opacity: selectedType === type.name ? 1 : 0.5 }}
        >
          {type.icon}
        </TypeButton>
      ))}
    </TypeFilterContainer>
  );
};
TypeFilter.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  selectedType: PropTypes.string.isRequired,
  onSelectType: PropTypes.func.isRequired,
};

export default TypeFilter;
