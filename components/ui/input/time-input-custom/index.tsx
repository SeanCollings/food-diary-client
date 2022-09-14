import { COLOURS, OPACITY_40 } from '@utils/constants';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

interface ISInput {
  isEmpty: boolean;
}

const SContainer = styled.div`
  display: flex;
  gap: 2px;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
const SInput = styled.input<ISInput>`
  transition: 0.5s;
  text-align: center;
  outline: none;
  border-radius: 4px;
  padding: 2px 4px;
  width: 40px;
  font-size: 17px;
  box-shadow: inset 0 3px ${COLOURS.gray_light};
  border: 1px dashed ${COLOURS.gray_dark}${OPACITY_40};

  color: ${({ isEmpty }) =>
    isEmpty ? `${COLOURS.black}${OPACITY_40}` : `${COLOURS.black}`};

  :focus {
    box-shadow: inset 0 0 ${COLOURS.gray_light};
    border: 1px solid ${COLOURS.gray_dark};
  }
`;
const SLabel = styled.label`
  font-size: 14px;
  padding-left: 4px;
  align-self: flex-end;
  display: flex;
  color: ${COLOURS.gray_dark};
`;

type TTime = 'hours' | 'minutes';

interface IComponentProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const formatFinalTime = (hours: string, minutes: string) => {
  let formattedHours = hours;
  let formattedMinutes = minutes;

  if (!formattedHours || +formattedHours > MAX_HOURS) {
    formattedHours = '00';
  }
  if (!formattedMinutes || +formattedMinutes > MAX_MINUTES) {
    formattedMinutes = '00';
  }

  return `${hours}:${minutes}`;
};

const getTime = (value: string) => {
  const [hours, minutes] = value.split(':');

  return [hours ?? '00', minutes ?? '00'];
};

const TimeInputCustom: FC<IComponentProps> = ({
  id,
  value,
  onChange,
  onBlur,
}) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  useEffect(() => {
    const [hours, minutes] = getTime(value);
    setHours(hours);
    setMinutes(minutes);
  }, [value]);

  const handleOnChange =
    (time: TTime) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      let newValue = value;

      if (newValue.length > 2) {
        newValue = value.slice(0, 2);
      }

      if (time === 'hours') {
        if (+newValue > MAX_HOURS || !newValue) {
          newValue = '00';
        } else if (+newValue < 0) {
          newValue = `${MAX_HOURS}`;
        }

        setHours(newValue);
      } else {
        if (+newValue > MAX_MINUTES || !newValue) {
          newValue = '00';
        } else if (+newValue < 0) {
          newValue = `${MAX_MINUTES}`;
        }
        setMinutes(newValue);
      }
    };
  const handleOnBlur = () => {
    let updatedHours = hours;
    let updatedMinutes = minutes;

    if (hours.length === 1) {
      updatedHours = `0${hours}`;
      setHours(updatedHours);
    }
    if (minutes.length === 1) {
      updatedMinutes = `0${minutes}`;
      setMinutes(updatedMinutes);
    }

    onChange(formatFinalTime(updatedHours, updatedMinutes));
    onBlur();
  };

  return (
    <SContainer title="HH:MM">
      <SInput
        id={`${id}-hours`}
        onChange={handleOnChange('hours')}
        onBlur={handleOnBlur}
        type="number"
        value={hours}
        maxLength={2}
        isEmpty={hours === '00' && minutes === '00'}
      />
      <span>:</span>
      <SInput
        id={`${id}-minutes`}
        onChange={handleOnChange('minutes')}
        onBlur={handleOnBlur}
        type="number"
        value={minutes}
        maxLength={2}
        isEmpty={hours === '00' && minutes === '00'}
      />
      <SLabel htmlFor={`${id}-hours`}>time (hh : mm)</SLabel>
    </SContainer>
  );
};

export default TimeInputCustom;
