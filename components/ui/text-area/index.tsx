import {
  COLOURS,
  MEDIA_MOBILE,
  OPACITY_10,
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
  box-shadow: ${({ backgroundColour }) =>
    !backgroundColour && `inset 0 3px ${COLOURS.gray_light}`};
  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `${backgroundColour}${OPACITY_30}` : 'inherit'};
  border: ${({ backgroundColour, borderStyle, borderWidth }) =>
    `${borderWidth}px ${borderStyle} ${
      backgroundColour ? 'transparent' : `${COLOURS.gray_dark}${OPACITY_40}`
    }`};

  :focus {
    box-shadow: inset 0 0 ${COLOURS.gray_light};
    border: solid
      ${({ backgroundColour, borderWidth }) =>
        `${borderWidth}px ${
          backgroundColour ? `${backgroundColour}` : `${COLOURS.gray_dark}`
        }`};
  }

  ${({ isError }) => isError && `border-color: ${COLOURS.error}`};

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ backgroundColour }) =>
        backgroundColour
          ? `${backgroundColour}`
          : `${COLOURS.gray_dark}`}${OPACITY_70};
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: ${({ backgroundColour }) =>
      backgroundColour ? `${backgroundColour}` : `${COLOURS.gray_dark}`};
  }
`;
const SError = styled.div`
  margin-top: -2px;
  font-size: 15px;
  text-align: right;
  padding-bottom: 4px;
  color: ${COLOURS.error};
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
        onChange={onChange}
        onBlur={onBlurHandler}
      />
      {!!isError && <SError>{isError}</SError>}
    </SContainer>
  );
};

export default TextArea;
