import { TypeFilterContainer, TypeButton } from './style';
import PropTypes from 'prop-types';

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
