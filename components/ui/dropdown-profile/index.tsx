import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface ISSelect {
  width?: number;
  hide?: boolean;
}

const SSelect = styled.select<ISSelect>`
  height: 35px;
  ${({ width }) => width && `width: ${width}px`};
  ${({ hide }) => hide && `display: none`};
`;
const SOption = styled.option``;

interface IOption {
  id: string;
  label: string;
}

interface IDropdownProfileProps {
  id: string;
  value: IOption;
  width?: number;
  hide?: boolean;
  options: IOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownProfile: FC<IDropdownProfileProps> = ({
  id,
  value,
  width,
  hide,
  options,
  onChange,
}) => {
  return (
    <SSelect
      id={id}
      value={value.id}
      width={width}
      hide={hide}
      onChange={onChange}
    >
      {options.map((option) => (
        <SOption key={option.id} value={option.id}>
          {option.label}
        </SOption>
      ))}
    </SSelect>
  );
};

export default DropdownProfile;
