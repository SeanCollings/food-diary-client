import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import {
  ThemeBackgroundSecondary,
  ThemeTextColor,
} from '@components/ui/style-themed';

interface ISSelect {
  width?: number;
  hide?: boolean;
  isDisabled?: boolean;
}

const SSelect = styled.select<ISSelect>`
  height: 35px;
  border-radius: 4px;
  font-size: 14px;
  ${({ isDisabled }) => !isDisabled && `cursor: pointer`};
  padding: 0 4px;
  ${({ width }) => width && `width: ${width}px`};
  ${({ hide }) => hide && `display: none`};

  ${ThemeTextColor}
  ${ThemeBackgroundSecondary}
`;
const SOption = styled.option`
  padding: 5px 0;
`;

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
  isDisabled?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownProfile: FC<IDropdownProfileProps> = ({
  id,
  value,
  width,
  hide,
  options,
  isDisabled,
  onChange,
}) => {
  return (
    <SSelect
      id={id}
      value={value.id}
      width={width}
      hide={hide}
      disabled={isDisabled}
      isDisabled={isDisabled}
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
