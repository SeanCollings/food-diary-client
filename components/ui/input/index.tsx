import { COLOURS, MEDIA_MOBILE, OPACITY_30 } from '@utils/app.constants';
import { INPUT_MAX_LENGTH } from '@utils/validation/validation.constants';
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
  borderWidth: number;
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
  color: var(--text);

  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `var(${backgroundColour}__40)` : 'inherit'};
  border: solid
    ${({ borderColour, borderWidth }) =>
      borderColour
        ? `${borderWidth}px var(${borderColour}__40)`
        : `${borderWidth}px ${COLOURS.black}${OPACITY_30}`};
  ${({ hideInitialBorder }) =>
    hideInitialBorder && 'border-color: transparent'};

  :focus {
    border: 2px solid
      ${({ borderColour }) =>
        borderColour ? `var(${borderColour})` : 'var(--text)'};
  }

  ${({ hasIcon }) => hasIcon && `padding-left: 38px`};
  ${({ isError }) => isError && `border-color: var(--error)`};
`;
const SIconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 4px;
`;
const SError = styled.div`
  position: absolute;
  font-size: 15px;
  right: 0;
  color: var(--error);
`;

type TInputType = 'text' | 'number';

export interface IInputProps {
  value: string;
  id: string;
  backgroundColour?: string;
  borderColour?: string;
  hideInitialBorder?: boolean;
  inputWidth?: number;
  minWidth?: number;
  placeholder?: string;
  isError?: string;
  children?: ReactNode;
  tabIndex?: number;
  type?: TInputType;
  borderWidth?: number;
  spellCheck?: boolean;
  onBlur?: () => void;
  onTabPressed?: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  spellCheck,
  borderWidth = 2,
  type = 'text',
  onBlur,
  onTabPressed,
  onChange,
  onMouseDown,
}) => {
  const onBlurHandler = () => onBlur?.();
  const onMouseDownHandler = () => onMouseDown?.();
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
        name={id}
        value={value}
        tabIndex={tabIndex}
        backgroundColour={backgroundColour}
        hideInitialBorder={hideInitialBorder}
        borderColour={borderColour}
        borderWidth={borderWidth}
        type={type}
        placeholder={placeholder}
        isError={!!isError}
        hasIcon={!!children}
        autoComplete={'off'}
        spellCheck={spellCheck}
        maxLength={INPUT_MAX_LENGTH}
        onBlur={onBlurHandler}
        onKeyDown={onKeyDownHandler}
        onChange={onChange}
        onMouseDown={onMouseDownHandler}
      />
      {!!isError && <SError>{isError}</SError>}
    </SContainer>
  );
};

export default Input;
