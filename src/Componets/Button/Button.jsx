import { useContext } from "react";
import { Buttons} from "./style";
import PropTypes from 'prop-types';
import { ThemeContext } from "../../contexts/ThemeContext";

 export const Button = ({
    onClick, 
    disabled = false, 
    type = 'button', 
    children,
    ...rest 
    
}) => {
    const {theme} = useContext(ThemeContext)

    return (
        <Buttons
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={{backgroundColor: theme.backgroundColor, color: theme.color}}
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