import styled from 'styled-components';
import PropTypes from 'prop-types';

const TypeFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const TypeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 5px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
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
