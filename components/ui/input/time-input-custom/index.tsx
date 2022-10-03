import { useTheme } from '@hooks/use-theme';
import { COLOURS, OPACITY_30, OPACITY_40 } from '@utils/constants';
import { replaceTextAtEnd } from '@utils/string-utils';
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
  colour: string;
  errorColour: string;
  borderColour: string;
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
  background-color: transparent;
  box-shadow: inset 0 3px
    ${({ borderColour }) => `${borderColour}${OPACITY_30}`};
  border: ${({ isError, errorColour, borderColour }) =>
    `1px dashed ${isError ? errorColour : `${borderColour}${OPACITY_40}`}`};

  color: ${({ colour }) => colour};

  :focus {
    box-shadow: inset 0 0 transparent;
    border: 1px solid ${({ borderColour }) => borderColour};
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
  const theme = useTheme();
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
  const opaqueColour = replaceTextAtEnd(theme.text, OPACITY_40, 2);

  return (
    <SContainer title="hh:mm">
      <SInput
        id={getHoursId(id)}
        type="number"
        value={hours}
        maxLength={2}
        isEmpty={isEmpty}
        isError={!!isError}
        colour={isEmpty ? opaqueColour : theme.text}
        borderColour={theme.quaternary}
        errorColour={theme.error}
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
        isError={!!isError}
        colour={isEmpty ? opaqueColour : theme.text}
        borderColour={theme.quaternary}
        errorColour={theme.error}
        onChange={handleOnChange('minutes')}
        onFocus={handleOnFocus(getMinutesId(id))}
        onBlur={handleOnBlur}
      />
      <SLabel htmlFor={getHoursId(id)}>time (hh : mm)</SLabel>
    </SContainer>
  );
};

export default TimeInputCustom;
