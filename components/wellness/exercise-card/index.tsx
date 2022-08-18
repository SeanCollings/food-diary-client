import TextArea from '@components/ui/text-area';
import { MEDIA_DESKTOP, MEDIA_MOBILE } from '@utils/constants';
import Image from 'next/image';
import { FC, useState } from 'react';
import styled from 'styled-components';

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
const SInputContainer = styled.div`
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
`;

interface IProps {
  id: string;
  title: string;
  imageSrc: string;
}

const ExcerciseCard: FC<IProps> = ({ id, title, imageSrc }) => {
  const [hasUpdated, setHasUpdated] = useState(false);
  const [excerciseDetails, setExcerciseDetails] = useState(
    '45 minutes - gym cycling and elliptical'
  );

  const handleOnChange = (value: string) => {
    setExcerciseDetails(value);
    setHasUpdated(true);
  };

  const handleOnBlur = () => {
    if (hasUpdated) {
      console.log(excerciseDetails.trim());
      setHasUpdated(false);
    }
  };

  return (
    <SContainer>
      <STitleContainer>
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
      </STitleContainer>
      <SInputContainer>
        <TextArea
          id="exercise"
          minWidth={250}
          value={excerciseDetails}
          borderStyle={'dashed'}
          borderWidth={1}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </SInputContainer>
    </SContainer>
  );
};

export default ExcerciseCard;
