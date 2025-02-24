// NavigationButtons.js
import { Navigation, ArrowButton } from './style';
import PropTypes from 'prop-types';
import { ImArrowRight } from "react-icons/im";
import { ImArrowLeft } from "react-icons/im";

const NavigationButtons = ({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) => {
  return (
    <Navigation>
      <ArrowButton onClick={onPrevious} disabled={isPreviousDisabled}>
        <ImArrowLeft />
      </ArrowButton>
      <ArrowButton onClick={onNext} disabled={isNextDisabled}>
        <ImArrowRight />
      </ArrowButton>
    </Navigation>
  );
};


NavigationButtons.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isPreviousDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};

export default NavigationButtons;
