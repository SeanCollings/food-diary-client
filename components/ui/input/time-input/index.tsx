import { COLOURS } from '@utils/app.constants';
import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface ISInput {
  invertClock?: boolean;
  hasNoValue: boolean;
}

const SContainer = styled.div``;
const SInput = styled.input<ISInput>`
  transition: 0.5s;
  outline: none;
  font-size: 20px;
  border: 0;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;

  ${({ hasNoValue }) => hasNoValue && 'opacity: 0.7'};

  ::-webkit-calendar-picker-indicator {
    cursor: pointer;
    ${({ invertClock }) => invertClock && `filter: invert(100%)`};
  }

  :focus {
    border: 1px solid ${COLOURS.gray_dark};
  }
`;

interface ITimeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const TimeInput: FC<ITimeInputProps> = ({ id, value, onChange, onBlur }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const onBlurHandler = () => {
    onBlur?.();
  };

  return (
    <SContainer title="HH:MM">
      <SInput
        type="time"
        id={id}
        min={'00:00'}
        max={'23:59'}
        value={value}
        hasNoValue={value === '00:00'}
        onChange={handleOnChange}
        onBlur={onBlurHandler}
      />
    </SContainer>
  );
};

export default TimeInput;
