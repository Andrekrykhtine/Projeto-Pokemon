import { Buttons} from "./style";
import PropTypes from 'prop-types';





const Button = ({children}) => (
    <Buttons  >
        {children}
    </Buttons>
);
Button.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Button;
