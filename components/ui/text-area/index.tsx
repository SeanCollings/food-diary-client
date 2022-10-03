import { useTheme } from '@hooks/use-theme';
import {
  MEDIA_MOBILE,
  OPACITY_30,
  OPACITY_40,
  OPACITY_70,
} from '@utils/constants';
import { TEXTAREA_MAX_LENGTH } from '@utils/validation/validation.constants';
import { ChangeEvent, FC } from 'react';
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
  colour: string;
  errorColour: string;
  borderColour: string;
}
interface ISError {
  colour: string;
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
  color: ${({ colour }) => colour};
  box-shadow: ${({ backgroundColour, borderColour }) =>
    !backgroundColour && `inset 0 3px ${borderColour}${OPACITY_30}`};
  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `${backgroundColour}${OPACITY_30}` : 'inherit'};
  border: ${({ backgroundColour, borderStyle, borderWidth, borderColour }) =>
    `${borderWidth}px ${borderStyle} ${
      backgroundColour ? 'transparent' : `${borderColour}${OPACITY_40}`
    }`};

  :focus {
    box-shadow: inset 0 0 transparent;
    border: solid
      ${({ backgroundColour, borderWidth, borderColour }) =>
        `${borderWidth}px ${
          backgroundColour ? `${backgroundColour}` : borderColour
        }`};
  }

  ${({ isError, errorColour }) => isError && `border-color: ${errorColour}`};

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ backgroundColour, borderColour }) =>
        backgroundColour
          ? `${backgroundColour}`
          : `${borderColour}`}${OPACITY_70};
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: ${({ backgroundColour, borderColour }) =>
      backgroundColour ? `${backgroundColour}` : borderColour};
  }
`;
const SError = styled.div<ISError>`
  margin-top: -2px;
  font-size: 15px;
  text-align: right;
  padding-bottom: 4px;
  color: ${({ colour }) => colour};
`;

type TBorderStylePropery = 'solid' | 'dashed' | 'dotted' | 'none';

export interface ITextAreaProps {
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
  onChange,
  onBlur,
}) => {
  const theme = useTheme();

  const onBlurHandler = () => {
    onBlur?.();
  };

  return (
    <SContainer inputWidth={inputWidth} minWidth={minWidth}>
      <STextArea
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
        colour={theme.text}
        borderColour={theme.quaternary}
        errorColour={theme.error}
        onChange={onChange}
        onBlur={onBlurHandler}
      />
      {!!isError && <SError colour={theme.error}>{isError}</SError>}
    </SContainer>
  );
};

export default TextArea;
