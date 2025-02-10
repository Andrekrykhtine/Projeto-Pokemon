import { Buttons} from "./style";
import PropTypes from 'prop-types';

const Button = ({ 
    onClick, 
    disabled = false, 
    type = 'button', 
    children,
    ...rest 
}) => {
    return (
        <Buttons
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...rest}
        >
            {children}
        </Buttons>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node,
};

export default Button;