import { COLOURS, MEDIA_MOBILE } from '@utils/app.constants';
import { FC } from 'react';
import { MdDeleteForever, MdWest } from 'react-icons/md';
import styled from 'styled-components';

interface ISHeader {
  backgroundColour: string;
}

const SHeader = styled.div<ISHeader>`
  position: relative;
  transition: 0.25s;
  padding: 10px 20px;
  color: ${COLOURS.white_off};
  font-size: 22px;
  font-weight: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  border-radius: 10px 10px 0 0;
  background: var(${({ backgroundColour }) => backgroundColour});

  .right {
    justify-content: end;
  }

  ${MEDIA_MOBILE} {
    border-radius: 0;
  }
`;
const SIconContainer = styled.div`
  display: flex;
  text-align-last: center;
  width: 50px;
`;
const SIconClose = styled(MdWest)`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const SIconDelete = styled(MdDeleteForever)`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

interface IModalHeaderProps {
  title: string;
  mealColour: string;
  onClose: () => void;
  onRemoveMeal?: (() => void) | null;
}

export const ModalHeader: FC<IModalHeaderProps> = ({
  title,
  mealColour,
  onClose,
  onRemoveMeal,
}) => {
  return (
    <SHeader backgroundColour={mealColour}>
      <SIconContainer>
        <SIconClose size={34} onClick={onClose} />
      </SIconContainer>
      {title}
      <SIconContainer className="right">
        {onRemoveMeal ? <SIconDelete size={34} onClick={onRemoveMeal} /> : null}
      </SIconContainer>
    </SHeader>
  );
};
