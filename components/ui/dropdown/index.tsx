import { COLOURS, MEDIA_MOBILE, OPACITY_30 } from '@utils/constants';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface ISContainer {
  inputWidth: number;
}
interface ISSelect {
  backgroundColour?: string;
}

const SContainer = styled.div<ISContainer>`
  width: ${({ inputWidth }) => inputWidth}px;

  ${MEDIA_MOBILE} {
    width: 100%;
  }
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
  color: var(--text);

  background-color: ${({ backgroundColour }) =>
    backgroundColour ? `var(${backgroundColour}__40)` : 'inherit'};
  border: 2px solid
    ${({ backgroundColour }) =>
      backgroundColour ? `transparent` : `${COLOURS.black}${OPACITY_30}`};

  :focus {
    border: 2px solid
      ${({ backgroundColour }) =>
        backgroundColour ? `var(${backgroundColour})` : `${COLOURS.black}`};
  }
`;
const SOption = styled.option<ISSelect>`
  background: var(--bg-secondary);
  color: var(--text);
`;

export type TDefaultOption = { id: string; title: string };

export interface IDropdownProps<T, K> {
  id: string;
  backgroundColour?: string;
  inputWidth: number;
  value: T;
  options: K[];
  tabIndex?: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = <T extends string, K extends TDefaultOption>({
  id,
  backgroundColour,
  inputWidth,
  options,
  value,
  tabIndex,
  onChange,
}: IDropdownProps<T, K>) => {
  return (
    <SContainer inputWidth={inputWidth}>
      <SSelect
        id={id}
        name={id}
        value={value}
        backgroundColour={backgroundColour}
        tabIndex={tabIndex}
        onChange={onChange}
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
