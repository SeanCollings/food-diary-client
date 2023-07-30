import TextArea from '@components/ui/text-area';
import { MEDIA_DESKTOP, MEDIA_MOBILE } from '@utils/constants';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDateSelectedContext } from '@store/date-selected-context';
import styled from 'styled-components';
import {
  TExcercise,
  useWellnessEntriesContext,
} from '@store/wellness-entries-context';
import TimeInputCustom from '@components/ui/input/time-input-custom';
import { runValidations } from '@utils/validation';
import { excerciseValidators } from '@utils/validation/validators/collections';
import { trim } from '@utils/string-utils';
import { TExcerciseEntry } from '@lib/interfaces/wellness.interface';

const SContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  ${MEDIA_DESKTOP} {
    gap: 20px;
    flex-wrap: nowrap;
  }
`;
const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SAllDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  ${MEDIA_MOBILE} {
    align-items: center;
  }
`;
const STimeInputContainer = styled.div``;
const STextAreaContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;
const SHeader = styled.div`
  padding-bottom: 12px;
  user-select: none;
  text-align: center;
`;
const SImageContainer = styled.div`
  height: 80px;
  width: 80px;
  user-select: none;
  margin-bottom: 8px;
  position: relative;
  text-align: center;
`;
const SImage = styled(Image)`
  width: auto;
  height: 100%;
  max-width: 100%;
`;

interface IRunFormValidations {
  details: string;
  time: string;
}

const runFormValidations = (values: IRunFormValidations) =>
  runValidations([
    excerciseValidators['details']({
      value: values.details,
    }),
    excerciseValidators['time']({
      value: values.time,
    }),
  ]);

interface IProps {
  id: string;
  title: string;
  imageSrc: string;
}

const ExcerciseCard: FC<IProps> = ({ title, imageSrc }) => {
  const { dateSelectedISO } = useDateSelectedContext();
  const { wellnessEntries, updateEntryByKey } = useWellnessEntriesContext();

  const [hasUpdated, setHasUpdated] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [time, setTime] = useState('00:00');
  const [excerciseDetails, setExcerciseDetails] = useState('');
  const [errors, setErrors] = useState<Partial<IRunFormValidations>>({});

  useEffect(() => {
    const currentDayExcerciseEntry = (
      wellnessEntries[dateSelectedISO] as TExcerciseEntry
    )?.excercise;

    setTime(currentDayExcerciseEntry?.time || '00:00');
    setExcerciseDetails(currentDayExcerciseEntry?.details || '');
  }, [dateSelectedISO, wellnessEntries]);

  useEffect(() => {
    const listener = () => {
      updateEntryByKey<TExcercise>({
        date: dateSelectedISO,
        type: 'excercise',
        content: { time, details: trim(excerciseDetails) },
      });
      setHasUpdated(false);
      setHasBlurred(false);
    };

    if (hasUpdated && hasBlurred) {
      const errors = runFormValidations({ details: excerciseDetails, time });

      if (!!Object.keys(errors).length) {
        return setErrors(errors);
      }

      listener();
    }
  }, [
    time,
    excerciseDetails,
    hasBlurred,
    hasUpdated,
    dateSelectedISO,
    updateEntryByKey,
  ]);

  const handleDetailsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExcerciseDetails(event.target.value);
    if (!hasUpdated) setHasUpdated(true);
  };
  const handleTimeChange = (value: string) => {
    if (!value) {
      return;
    }

    if (time !== value) {
      setTime(value);
      setHasUpdated(true);
    }
  };
  const handleOnBlur = () => {
    if (!hasBlurred) setHasBlurred(true);

    const errors = runFormValidations({ details: excerciseDetails, time });
    setErrors(errors);
  };

  return (
    <SContainer>
      <STitleContainer>
        <SHeader>{title}</SHeader>
        <SImageContainer>
          <SImage
            src={imageSrc}
            alt={title}
            width={128}
            height={180}
            priority={false}
          />
        </SImageContainer>
      </STitleContainer>
      <SAllDetailsContainer>
        <STextAreaContainer>
          <TextArea
            id="exercise"
            minWidth={250}
            value={excerciseDetails}
            isError={errors.details}
            borderStyle={'dashed'}
            borderWidth={1}
            totalRows={3}
            placeholder="..."
            title="add excercise notes"
            onChange={handleDetailsChange}
            onBlur={handleOnBlur}
          />
        </STextAreaContainer>
        <STimeInputContainer>
          <TimeInputCustom
            id="exercise_time"
            value={time}
            isError={errors.time}
            onChange={handleTimeChange}
            onBlur={handleOnBlur}
          />
        </STimeInputContainer>
      </SAllDetailsContainer>
    </SContainer>
  );
};

export default ExcerciseCard;
