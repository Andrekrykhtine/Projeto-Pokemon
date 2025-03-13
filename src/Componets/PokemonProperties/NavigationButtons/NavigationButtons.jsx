import { Navigation, ArrowButton } from './style';
import PropTypes from 'prop-types';
import { ImArrowLeft, ImArrowRight } from "react-icons/im";

const NavigationButtons = ({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) => {
  const handlePreviousClick = () => {
    if (!isPreviousDisabled) {
      onPrevious();
    }
  };

  const handleNextClick = () => {
    if (!isNextDisabled) {
      onNext();
    }
  };

  return (
    <Navigation>
      <ArrowButton
        onClick={handlePreviousClick}
        disabled={isPreviousDisabled}
        aria-label="previous"
        data-testid="previous-button"
      >
        <ImArrowLeft />
      </ArrowButton>
      <ArrowButton
        onClick={handleNextClick}
        disabled={isNextDisabled}
        aria-label="next"
        data-testid="next-button"
      >
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