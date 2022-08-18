import { COLOURS, MEDIA_MOBILE, OPACITY_30 } from '@utils/constants';
import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';
import styled from 'styled-components';

interface ISContainer {
  inputWidth?: number;
  minWidth?: number;
}
interface ISInput {
  backgroundColour?: string;
  borderColour?: string;
  isError?: boolean;
  hideInitialBorder?: boolean;
  hasIcon: boolean;
}

const SContainer = styled.div<ISContainer>`
  position: relative;
  width: ${({ inputWidth }) => (inputWidth ? `${inputWidth}px` : '100%')};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}px`};

  ${MEDIA_MOBILE} {
    width: 100%;
  }
`;
const SInput = styled.input<ISInput>`
  transition: 0.25s;
  outline: none;
  text-align: center;

  font-size: 18px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;

  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `${backgroundColour}${OPACITY_30}` : 'inherit'};
  border: 2px solid
    ${({ borderColour }) =>
      borderColour
        ? `${borderColour}${OPACITY_30}`
        : `${COLOURS.black}${OPACITY_30}`};
  ${({ hideInitialBorder }) =>
    hideInitialBorder && 'border-color: transparent'};

  :focus {
    border: 2px solid
      ${({ borderColour }) =>
        borderColour ? `${borderColour}` : `${COLOURS.black}`};
  }

  ${({ hasIcon }) => hasIcon && `padding-left: 38px`};
  ${({ isError }) =>
    isError &&
    `border-color: ${COLOURS.error}; background-color:  ${COLOURS.error}${OPACITY_30}`}
`;
const SIconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 4px;
`;

export interface IInputProps {
  value: string;
  id: string;
  backgroundColour?: string;
  borderColour?: string;
  hideInitialBorder?: boolean;
  inputWidth?: number;
  minWidth?: number;
  placeholder?: string;
  isError?: boolean;
  children?: ReactNode;
  tabIndex?: number;
  onTabPressed?: () => void;
  onChange: (value: string) => void;
  onMouseDown?: () => void;
}

export const Input: FC<IInputProps> = ({
  id,
  value,
  backgroundColour,
  hideInitialBorder,
  borderColour,
  inputWidth,
  minWidth,
  placeholder,
  isError,
  children,
  tabIndex,
  onTabPressed,
  onChange,
  onMouseDown,
}) => {
  const onMouseDownHandler = () => onMouseDown?.();
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && onTabPressed) {
      event.preventDefault();
      onTabPressed();
    }
  };

  return (
    <SContainer inputWidth={inputWidth} minWidth={minWidth}>
      <SIconContainer>{children}</SIconContainer>
      <SInput
        id={id}
        value={value}
        tabIndex={tabIndex}
        backgroundColour={backgroundColour}
        hideInitialBorder={hideInitialBorder}
        borderColour={borderColour}
        type="text"
        placeholder={placeholder}
        isError={isError}
        hasIcon={!!children}
        autoComplete={'off'}
        spellCheck={false}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        onMouseDown={onMouseDownHandler}
      />
    </SContainer>
  );
};

export default Input;
