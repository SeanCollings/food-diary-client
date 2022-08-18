import { COLOURS, OPACITY_10, OPACITY_30, OPACITY_70 } from '@utils/constants';
import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  inputWidth: number;
}
interface ISSelect {
  backgroundColour?: string;
}

const SContainer = styled.div<ISContainer>`
  width: ${({ inputWidth }) => inputWidth}px;
`;
const SSelect = styled.select<ISSelect>`
  appearance: none;
  transition: 0.25s;
  width: 100%;
  font-size: 18px;
  padding: 8px 10px;
  outline: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.1;

  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `${backgroundColour}${OPACITY_30}` : 'inherit'};
  border: 2px solid
    ${({ backgroundColour }) =>
      backgroundColour ? `transparent` : `${COLOURS.black}${OPACITY_30}`};

  :focus {
    border: 2px solid
      ${({ backgroundColour }) =>
        backgroundColour ? `${backgroundColour}` : `${COLOURS.black}`};
  }
`;
const SOption = styled.option<ISSelect>`
  --background-colour: ${COLOURS.white};
  background: var(--background-colour);
`;

export interface IDropdownProps {
  id: string;
  backgroundColour?: string;
  inputWidth: number;
  value: any;
  options: any[];
  tabIndex?: number;
  onChange: (value: any) => void;
}

const Dropdown: FC<IDropdownProps> = ({
  id,
  backgroundColour,
  inputWidth,
  options,
  value,
  tabIndex,
  onChange,
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <SContainer inputWidth={inputWidth}>
      <SSelect
        id={id}
        name={id}
        value={value?.title}
        backgroundColour={backgroundColour}
        tabIndex={tabIndex}
        onChange={onChangeHandler}
        onBlur={(e) => e.preventDefault()}
      >
        {options?.map((option) => (
          <SOption
            key={option.id}
            value={option.id}
            backgroundColour={backgroundColour}
          >
            {option.title}
          </SOption>
        ))}
      </SSelect>
    </SContainer>
  );
};

export default Dropdown;
