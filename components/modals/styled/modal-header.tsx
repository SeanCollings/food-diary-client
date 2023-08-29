import { COLOURS } from '@utils/app.constants';
import { FC } from 'react';
import { MdWest } from 'react-icons/md';
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  border-radius: 10px 10px 0 0;
  background: var(${({ backgroundColour }) => backgroundColour});
`;
const SIconClose = styled(MdWest)`
  position: absolute;
  left: 20px;

  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
interface IModalHeaderProps {
  title: string;
  mealColour: string;
  onClose: () => void;
}

export const ModalHeader: FC<IModalHeaderProps> = ({
  title,
  mealColour,
  onClose,
}) => {
  return (
    <SHeader backgroundColour={mealColour}>
      <SIconClose size={34} onClick={onClose} />
      {title}
    </SHeader>
  );
};
