import { COLOURS } from '@utils/constants';
import { FC } from 'react';
import { MdCheck, MdWest } from 'react-icons/md';
import styled from 'styled-components';

interface ISHeader {
  backgroundColour: string;
}

const SHeader = styled.div<ISHeader>`
  transition: 0.25s;
  padding: 10px 20px;
  color: ${COLOURS.white_off};
  font-size: 22px;
  font-weight: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background: ${({ backgroundColour }) => backgroundColour};
`;
const SIconClose = styled(MdWest)`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const SIconSubmit = styled(MdCheck)`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

interface IModalHeaderProps {
  title: string;
  mealColour: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalHeader: FC<IModalHeaderProps> = ({
  title,
  mealColour,
  onClose,
  onSubmit,
}) => {
  return (
    <SHeader backgroundColour={mealColour}>
      <SIconClose size={34} onClick={onClose} />
      {title}
      <SIconSubmit size={34} onClick={onSubmit} />
    </SHeader>
  );
};
