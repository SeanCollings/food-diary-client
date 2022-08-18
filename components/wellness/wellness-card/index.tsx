import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';

const SContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SHeader = styled.div`
  padding-bottom: 12px;
  user-select: none;
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
  min-width: 40px;
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
  id: string;
  title: string;
  imageSrc: string;
  color: string;
}

const WellnessCard: FC<IProps> = ({ id, title, imageSrc, color }) => {
  const [counter, setCounter] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (hasUpdated) {
      const timer = setTimeout(async () => {
        console.log('Sending count for', id, 'as:', counter);
      }, 750);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, counter, hasUpdated]);

  const onClickRemove = () => {
    if (counter > 0) {
      setCounter((curr) => curr - 1);
      setHasUpdated(true);
    }
  };
  const onClickAdd = () => {
    setCounter((curr) => curr + 1);
    setHasUpdated(true);
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
