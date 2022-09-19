import { COLOURS, OPACITY_40 } from '@utils/constants';
import {
  formatFinalTime,
  getFormatMinutesWithHours,
  getSplitTime,
} from '@utils/time-utils';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const MAX_INPUT_HOURS = 23;
const MAX_INPUT_NUMBER = 99;

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
  padding: 1px 4px;
  width: 40px;
  font-size: 18px;
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

type TTimeType = 'hours' | 'minutes';

interface IComponentProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const getHoursId = (id: string) => `${id}_hours`;
const getMinutesId = (id: string) => `${id}_minutes`;

const TimeInputCustom: FC<IComponentProps> = ({
  id,
  value,
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
      const { value } = event.target;
      let newValue = value;

      if (newValue.length > 2 && +newValue !== MAX_INPUT_NUMBER + 1) {
        newValue = value.slice(0, 2);
      }

      if (type === 'hours') {
        if (!newValue || +newValue === MAX_INPUT_HOURS + 1) {
          newValue = '0';
        } else if (+newValue === -1) {
          newValue = MAX_INPUT_HOURS.toString();
        }

        return setHours(newValue);
      }

      if (!newValue || +newValue === MAX_INPUT_NUMBER + 1) {
        newValue = '0';
      } else if (+newValue === -1) {
        newValue = MAX_INPUT_NUMBER.toString();
      }

      setMinutes(newValue);
    };
  const handleOnBlur = () => {
    const [updatedHours, updatedMinutes] = getFormatMinutesWithHours(
      hours,
      minutes
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
        onChange={handleOnChange('hours')}
        onFocus={handleOnFocus(getHoursId(id))}
        onBlur={handleOnBlur}
      />
      <span>:</span>
      <SInput
        id={getMinutesId(id)}
        type="number"
        value={minutes}
        maxLength={2}
        isEmpty={isEmpty}
        onChange={handleOnChange('minutes')}
        onFocus={handleOnFocus(getMinutesId(id))}
        onBlur={handleOnBlur}
      />
      <SLabel htmlFor={getHoursId(id)}>time (hh : mm)</SLabel>
    </SContainer>
  );
};

export default TimeInputCustom;
