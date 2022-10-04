import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { TWellnessTypes } from '@utils/interfaces';
import { useDateSelectedContext } from '@store/date-selected-context';
import {
  TDrink,
  useWellnessEntriesContext,
} from '@store/wellness-entries-context';
import { COLOURS } from '@utils/constants';

interface SCount {
  hasNoValue: boolean;
}

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
  cursor: pointer;

  :hover {
    filter: drop-shadow(0px 0px 1px ${COLOURS.gray_dark});
  }
`;
const SCounterContainer = styled.div`
  padding-top: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  user-select: none;
`;
const SCount = styled.div<SCount>`
  transition: 0.1s;
  text-align: center;
  min-width: 54px;

  ${({ hasNoValue }) => hasNoValue && 'opacity: 0.4'};
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
  const { wellnessEntries, updateEntryByKey } = useWellnessEntriesContext();

  const [counter, setCounter] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    const currentEntry = wellnessEntries[dateSelectedISO];
    setCounter((currentEntry?.[id] as TDrink)?.value || 0);
  }, [dateSelectedISO, wellnessEntries, id]);

  useEffect(() => {
    if (hasUpdated) {
      updateEntryByKey<TDrink>({
        date: dateSelectedISO,
        type: id,
        content: { value: counter },
      });
      setHasUpdated(false);
    }
  }, [id, counter, hasUpdated, dateSelectedISO, updateEntryByKey]);

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
      <SImageContainer onClick={onClickAdd}>
        <Image
          src={imageSrc}
          alt={title}
          width="100%"
          height="100%"
          objectFit="contain"
          draggable={false}
        />
      </SImageContainer>
      <SCounterContainer>
        <SIconRemove size={24} color={color} onClick={onClickRemove} />
        <SCount hasNoValue={counter === 0}>{counter}</SCount>
        <SIconAdd size={24} color={color} onClick={onClickAdd} />
      </SCounterContainer>
    </SContainer>
  );
};

export default WellnessCard;
