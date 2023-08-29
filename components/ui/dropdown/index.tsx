import { COLOURS, MEDIA_MOBILE, OPACITY_30 } from '@utils/app.constants';
import { ChangeEvent, FocusEvent } from 'react';
import { MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';

interface ISContainer {
  inputWidth: number;
}
interface ISSelect {
  backgroundColour?: string;
}

const SContainer = styled.div<ISContainer>`
  position: relative;
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
const SIcon = styled(MdExpandMore)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%) rotateX(0deg);
  pointer-events: none;
  transition: 200ms;
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
  const handleOnBlur = (e: FocusEvent<HTMLSelectElement, Element>) => {
    e.preventDefault();
  };

  return (
    <SContainer inputWidth={inputWidth}>
      <SIcon size={22} />
      <SSelect
        id={id}
        name={id}
        value={value}
        backgroundColour={backgroundColour}
        tabIndex={tabIndex}
        onChange={onChange}
        onBlur={handleOnBlur}
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
