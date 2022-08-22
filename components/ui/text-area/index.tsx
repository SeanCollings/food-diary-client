import {
  COLOURS,
  MEDIA_MOBILE,
  OPACITY_30,
  OPACITY_40,
  OPACITY_70,
} from '@utils/constants';
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
}

const SContainer = styled.div<ISContainer>`
  width: ${({ inputWidth }) => (inputWidth ? `${inputWidth}px` : '100%')};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}px`};

  ${MEDIA_MOBILE} {
    width: 100%;
    min-width: 100%;
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
  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `${backgroundColour}${OPACITY_30}` : 'inherit'};
  border: ${({ backgroundColour, borderStyle, borderWidth }) =>
    `${borderWidth}px ${borderStyle} ${
      backgroundColour ? 'transparent' : `${COLOURS.gray_dark}${OPACITY_40}`
    }`};

  :focus {
    border: solid
      ${({ backgroundColour, borderWidth }) =>
        `${borderWidth}px ${
          backgroundColour ? `${backgroundColour}` : `${COLOURS.gray_dark}`
        }`};
  }

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
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const TextArea: FC<ITextAreaProps> = ({
  id,
  backgroundColour,
  inputWidth,
  minWidth,
  value,
  tabIndex,
  totalRows = 4,
  borderStyle = 'solid',
  borderWidth = 2,
  placeholder,
  onChange,
  onBlur,
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    onChange(event.target.value);
  const onBlurHandler = () => {
    onBlur?.();
  };

  return (
    <SContainer inputWidth={inputWidth} minWidth={minWidth}>
      <STextArea
        id={id}
        rows={totalRows}
        value={value}
        tabIndex={tabIndex}
        backgroundColour={backgroundColour}
        borderStyle={borderStyle}
        borderWidth={borderWidth}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </SContainer>
  );
};

export default TextArea;
