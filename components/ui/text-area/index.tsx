import { MEDIA_MOBILE } from '@utils/app.constants';
import { TEXTAREA_MAX_LENGTH } from '@utils/validation/validation.constants';
import { ChangeEvent, FC, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ISContainer {
  inputWidth?: number;
  minWidth?: number;
}
interface ISTextArea {
  backgroundColour?: string;
  borderStyle: TBorderStylePropery;
  borderWidth: number;
  isError?: boolean;
}

const SContainer = styled.div<ISContainer>`
  width: ${({ inputWidth }) => (inputWidth ? `${inputWidth}px` : '100%')};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}px`};

  ${MEDIA_MOBILE} {
    width: 100%;
    min-width: 100%;
  }

  textarea::-webkit-input-placeholder {
    opacity: 0.7;
  }
`;
const STextArea = styled.textarea<ISTextArea>`
  transition: 0.5s;
  outline: none;
  resize: none;
  text-align: center;
  overflow-y: auto;
  font-size: 18px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--text);
  box-shadow: ${({ backgroundColour }) =>
    !backgroundColour && `inset 0 3px var(--th-quaternary__40)`};
  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `var(${backgroundColour}__40)` : 'inherit'};
  border: ${({ backgroundColour, borderStyle, borderWidth }) =>
    `${borderWidth}px ${borderStyle} ${
      backgroundColour ? 'transparent' : `var(--th-quaternary__40)`
    }`};

  :focus {
    box-shadow: inset 0 0 transparent;
    border: solid
      ${({ backgroundColour, borderWidth }) =>
        `${borderWidth}px ${
          backgroundColour ? `var(${backgroundColour})` : 'var(--th-quaternary)'
        }`};
  }

  ${({ isError }) => isError && `border-color: var(--error);`};

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ backgroundColour }) =>
      backgroundColour ? `var(${backgroundColour})` : `var(--th-quaternary)`};
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: ${({ backgroundColour }) =>
      backgroundColour ? `${backgroundColour}` : 'var(--th-quaternary)'};
  }
`;
const SError = styled.div`
  margin-top: -2px;
  font-size: 15px;
  text-align: right;
  padding-bottom: 4px;
  color: var(--error);
`;

type TBorderStylePropery = 'solid' | 'dashed' | 'dotted' | 'none';

export interface ITextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  backgroundColour?: string;
  inputWidth?: number;
  minWidth?: number;
  value: string;
  totalRows?: number;
  borderStyle?: TBorderStylePropery;
  borderWidth?: number;
  tabIndex?: number;
  placeholder?: string;
  title?: string;
  isError?: string;
  spellCheck?: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

export const TextArea: FC<ITextAreaProps> = ({
  id,
  backgroundColour,
  inputWidth,
  minWidth,
  value,
  isError,
  tabIndex,
  totalRows = 4,
  borderStyle = 'solid',
  borderWidth = 2,
  placeholder,
  title,
  spellCheck,
  onChange,
  onBlur,
  ...rest
}) => {
  const onBlurHandler = () => {
    onBlur?.();
  };

  return (
    <SContainer inputWidth={inputWidth} minWidth={minWidth}>
      <STextArea
        {...rest}
        id={id}
        name={id}
        rows={totalRows}
        value={value}
        title={title}
        isError={!!isError}
        tabIndex={tabIndex}
        backgroundColour={backgroundColour}
        borderStyle={borderStyle}
        borderWidth={borderWidth}
        placeholder={placeholder}
        maxLength={TEXTAREA_MAX_LENGTH}
        spellCheck={spellCheck}
        onChange={onChange}
        onBlur={onBlurHandler}
      />
      {!!isError && <SError>{isError}</SError>}
    </SContainer>
  );
};

export default TextArea;
