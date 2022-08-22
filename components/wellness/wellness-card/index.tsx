import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { TWellnessTypes } from '@utils/interfaces';
import { useDiaryEntriesContext } from '@store/diary-entries-context';
import { useDateSelectedContext } from '@store/date-selected-context';

const SContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SHeader = styled.div`
  padding-bottom: 12px;
  text-align: center;
`;
const SImageContainer = styled.div`
  height: 50px;
  width: 50px;
  user-select: none;
`;
const SCounterContainer = styled.div`
  padding-top: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  user-select: none;
`;
const SCount = styled.div`
  text-align: center;
  min-width: 54px;
`;
const SIconRemove = styled(MdRemoveCircle)`
  cursor: pointer;
  :hover {
    scale: 1.1;
    opacity: 0.7;
  }
`;
const SIconAdd = styled(MdAddCircle)`
  cursor: pointer;
  :hover {
    scale: 1.1;
    opacity: 0.7;
  }
`;

interface IProps {
  id: TWellnessTypes;
  title: string;
  imageSrc: string;
  color: string;
}

const WellnessCard: FC<IProps> = ({ id, title, imageSrc, color }) => {
  const { dateSelectedISO } = useDateSelectedContext();
  const { diaryEntries, updateWellnessEntry } = useDiaryEntriesContext();

  const [counter, setCounter] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    const currentEntry = diaryEntries[dateSelectedISO];
    setCounter(currentEntry?.[id]?.value || 0);
  }, [dateSelectedISO, diaryEntries, id]);

  useEffect(() => {
    if (hasUpdated) {
      const timer = setTimeout(async () => {
        updateWellnessEntry({ date: dateSelectedISO, id, value: counter });
        setHasUpdated(false);
      }, 750);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, counter, hasUpdated, dateSelectedISO, updateWellnessEntry]);

  const onClickRemove = () => {
    if (counter > 0) {
      setCounter((curr) => curr - 1);
      setHasUpdated(true);
    }
  };
  const onClickAdd = () => {
    if (counter < 99) {
      setCounter((curr) => curr + 1);
      setHasUpdated(true);
    }
  };

  return (
    <SContainer>
      <SHeader>{title}</SHeader>
      <SImageContainer>
        <Image
          src={imageSrc}
          alt={title}
          width="100%"
          height="100%"
          objectFit="contain"
        />
      </SImageContainer>
      <SCounterContainer>
        <SIconRemove size={24} color={color} onClick={onClickRemove} />
        <SCount>{counter}</SCount>
        <SIconAdd size={24} color={color} onClick={onClickAdd} />
      </SCounterContainer>
    </SContainer>
  );
};

export default WellnessCard;
