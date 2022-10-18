import { COLOURS } from '@utils/constants';
import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  colour?: string;
}

const SContainer = styled.div<ISContainer>`
  display: flex;
  align-items: center;

  input[type='radio'] {
    transition: 0.1s;
    appearance: none;
    min-width: 16px;
    height: 16px;
    border-radius: 16px;
    outline: none;
    margin-right: 8px;
    cursor: pointer;
    background-color: ${COLOURS.white_off};
    border: 2px solid ${COLOURS.gray_dark};
  }
  input[type='radio']:checked {
    border: 4px solid var(${({ colour }) => colour});
  }
`;
const SRadio = styled.input`
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`;

interface IRadioButtonProps {
  id: string | number;
  value: string | number;
  name: string;
  colour?: string;
  onChange: (value: string) => void;
}

const RadioButton: FC<IRadioButtonProps> = ({
  id,
  value,
  name,
  colour,
  onChange,
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <SContainer colour={colour}>
      <SRadio
        id={`${id}-radio`}
        type={'radio'}
        value={value}
        name={name}
        onChange={onChangeHandler}
      />
    </SContainer>
  );
};

export default RadioButton;
