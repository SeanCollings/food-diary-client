import { FC, useEffect, useState } from 'react';
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
import { TBeverageEntry } from '@lib/interfaces/wellness.interface';

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
  position: relative;
  height: 50px;
  width: 50px;
  user-select: none;
  cursor: pointer;
  text-align: center;

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
const SCount = styled.div`
  text-align: center;
  min-width: 54px;

  &.no-value {
    opacity: 0.4;
  }
`;
const SButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  display: flex;
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
const SImage = styled(Image)`
  width: auto;
  height: 100%;
  max-width: 100%;
`;

interface IProps {
  id: TWellnessTypes;
  title: string;
  imageSrc: string;
  color: string;
  width: number;
  height: number;
}

const WellnessCard: FC<IProps> = ({
  id,
  title,
  imageSrc,
  color,
  width,
  height,
}) => {
  const { dateSelectedISO } = useDateSelectedContext();
  const { wellnessEntries, updateEntryByKey } = useWellnessEntriesContext();

  const [counter, setCounter] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    const currentEntry = wellnessEntries[dateSelectedISO] as TBeverageEntry;
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
        <SImage
          src={imageSrc}
          alt={title}
          width={width}
          height={height}
          draggable={false}
        />
      </SImageContainer>
      <SCounterContainer>
        <SButton data-testid={`${id}-remove`}>
          <SIconRemove size={24} color={color} onClick={onClickRemove} />
        </SButton>
        <SCount className={counter === 0 ? 'no-value' : ''}>{counter}</SCount>
        <SButton data-testid={`${id}-add`}>
          <SIconAdd size={24} color={color} onClick={onClickAdd} />
        </SButton>
      </SCounterContainer>
    </SContainer>
  );
};

export default WellnessCard;
