import { Button } from '@components/ui/button';
import { ThemeColor } from '@utils/interfaces';
import { getThemeVarColor } from '@utils/theme-utils';
import { FC } from 'react';
import styled from 'styled-components';

interface ISFooter {
  colour: string;
}

const SContainer = styled.div<ISFooter>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  width: 100%;
  height: 60px;
  border-top: 1px solid;
  border-color: var(${({ colour }) => colour});

  transition: 0.4s;
`;
const SBackground = styled.div<ISFooter>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background: var(${({ colour }) => colour});

  transition: 0.4s;
`;

interface ModalFooterProps {
  submitText: string;
  closeText: string;
  mealColour: ThemeColor;
  onSubmit: () => void;
  onClose?: () => void;
}

export const ModalFooter: FC<ModalFooterProps> = ({
  submitText,
  closeText,
  mealColour,
  onSubmit,
  onClose,
}) => {
  const themeColout = getThemeVarColor(mealColour);

  return (
    <SContainer colour={themeColout}>
      <SBackground colour={themeColout} />
      <Button
        fontSize={18}
        background={mealColour}
        onClick={onClose}
        width={130}
        inverted
      >
        {closeText}
      </Button>
      <Button
        fontSize={18}
        background={mealColour}
        onClick={onSubmit}
        width={130}
      >
        {submitText}
      </Button>
    </SContainer>
  );
};
