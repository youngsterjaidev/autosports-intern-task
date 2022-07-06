import styled from "styled-components";
import { defaultTheme, typeScale } from "../../utils";

const Button = styled.button`
  padding: 5px 10px;
  font-size: ${typeScale.paragraph};
  border-radius: 4px;
  min-width: 100px;
  cursor: pointer;
  font-family: ${defaultTheme.primaryFont};
  transition: background-color 0.2s linear, color 0.2s linear,
    border 0.2s linear;

  &:hover {
    background-color: ${defaultTheme.primaryHoverColor};
    color: ${defaultTheme.textColorOnPrimary};
  }

  &:focus {
    outline: 3px solid ${defaultTheme.primaryHoverColor};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${defaultTheme.primaryActiveColor};
    border-color: ${defaultTheme.primaryActiveColor};
    color: ${defaultTheme.textColorOnPrimary};
  }

  &:disabled {
    cursor: not-allowed;
    background: none;
    color: ${defaultTheme.disabled};
    border: none;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${defaultTheme.primaryColor};
  color: ${defaultTheme.textColorOnPrimary};
  border: 2px solid transparent;

  &:disabled {
    background-color: ${defaultTheme.disabled};
    border-color: ${defaultTheme.disabled};
  }
`;

export const SecondaryButton = styled(Button)`
  border: 2px solid ${defaultTheme.primaryColor};
  color: ${defaultTheme.primaryColor};

  &:disabled {
    border: 2px solid ${defaultTheme.disabled};
  }
`;

export const TertiaryButton = styled(Button)`
  border: 2px solid transparent;
  color: ${defaultTheme.primaryColor};
`;

export default PrimaryButton;
