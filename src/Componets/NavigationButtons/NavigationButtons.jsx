// NavigationButtons.js
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavigationButtons = ({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) => {
  return (
    <Navigation>
      <ArrowButton onClick={onPrevious} disabled={isPreviousDisabled}>
        ← Anterior
      </ArrowButton>
      <ArrowButton onClick={onNext} disabled={isNextDisabled}>
        Próximo →
      </ArrowButton>
    </Navigation>
  );
};

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ArrowButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;
NavigationButtons.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isPreviousDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};

export default NavigationButtons;
