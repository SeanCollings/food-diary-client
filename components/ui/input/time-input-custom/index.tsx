import { COLOURS } from '@utils/app.constants';
import {
  formatFinalTime,
  getFormatMinutesWithHours,
  getNewHourValue,
  getNewMinuteValue,
  getSplitTime,
  truncateTimeValue,
} from '@utils/time-utils';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface ISInput {
  isEmpty: boolean;
  isError: boolean;
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
  transition: box-shadow 0.2s;
  text-align: center;
  outline: none;
  border-radius: 4px;
  padding: 1px 4px;
  width: 40px;
  font-size: 18px;
  background-color: transparent;
  box-shadow: inset 0 3px var(--th-quaternary__40);
  border: 1px dashed var(--th-quaternary__40);

  color: var(--text);

  &.empty {
    color: var(--text__40);
  }
  &.error {
    border: 1px dashed var(--error);
  }

  :focus {
    box-shadow: inset 0 0 transparent;
    border: 1px solid var(--th-quaternary);
  }
`;
const SLabel = styled.label`
  font-size: 14px;
  padding-left: 4px;
  align-self: flex-end;
  display: flex;
  color: ${COLOURS.gray_dark};
`;

type TTimeType = 'hours' | 'minutes';

interface IComponentProps {
  id: string;
  value: string;
  isError?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const getHoursId = (id: string) => `${id}_hours`;
const getMinutesId = (id: string) => `${id}_minutes`;

const TimeInputCustom: FC<IComponentProps> = ({
  id,
  value,
  isError,
  onChange,
  onBlur,
}) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  useEffect(() => {
    const [hours, minutes] = getSplitTime(value);
    setHours(hours);
    setMinutes(minutes);
  }, [value]);

  const handleOnChange =
    (type: TTimeType) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = truncateTimeValue(event.target.value);

      if (type === 'hours') {
        return setHours(getNewHourValue(newValue));
      }

      setMinutes(getNewMinuteValue(newValue));
    };
  const handleOnBlur = () => {
    const [updatedHours, updatedMinutes] = getFormatMinutesWithHours(
      hours,
      minutes,
    );

    setHours(updatedHours);
    setMinutes(updatedMinutes);
    onChange(formatFinalTime(updatedHours, updatedMinutes));
    onBlur?.();
  };
  const handleOnFocus = (id: string) => () => {
    const element = document.getElementById(id) as HTMLInputElement;

    if (!element) {
      return;
    }

    element.select();
  };

  const isEmpty = hours === '00' && minutes === '00';

  return (
    <SContainer title="hh:mm">
      <SInput
        id={getHoursId(id)}
        type="number"
        value={hours}
        maxLength={2}
        isEmpty={isEmpty}
        isError={!!isError}
        onChange={handleOnChange('hours')}
        onFocus={handleOnFocus(getHoursId(id))}
        onBlur={handleOnBlur}
        className={isEmpty ? 'empty' : ''}
      />
      <span>:</span>
      <SInput
        id={getMinutesId(id)}
        type="number"
        value={minutes}
        maxLength={2}
        isEmpty={isEmpty}
        isError={!!isError}
        onChange={handleOnChange('minutes')}
        onFocus={handleOnFocus(getMinutesId(id))}
        onBlur={handleOnBlur}
        className={isEmpty ? 'empty' : ''}
      />
      <SLabel htmlFor={getHoursId(id)}>time (hh : mm)</SLabel>
    </SContainer>
  );
};

export default TimeInputCustom;
