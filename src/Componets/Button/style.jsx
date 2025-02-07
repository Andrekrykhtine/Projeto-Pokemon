import styled from "styled-components";

export const Buttons = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontsize.normal};
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin: 1rem;
    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`;