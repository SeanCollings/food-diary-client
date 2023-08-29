import { Button } from '@components/ui/button';
import { COLOURS, MEDIA_MOBILE } from '@utils/app.constants';
import { ThemeColor } from '@utils/interfaces';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.div`
  position: relative;
  background-color: var(--bg-secondary);
  padding: 24px;
  ${MEDIA_MOBILE} {
    padding: 24px 12px;
  }
`;
const SInnerContainer = styled.div`
  border: 1px solid ${COLOURS.gray_dark};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 17px;
  background-color: var(--bg-secondary);
  padding: 36px 40px;

  ${MEDIA_MOBILE} {
    padding: 36px 20px;
  }
`;
const SButtonPromptContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

interface ConfirmModalProps {
  themeColour: ThemeColor;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  themeColour,
  onConfirm,
  onCancel,
}) => {
  return (
    <SContainer>
      <SInnerContainer>
        Are you sure you want to permanetly delete this item?
        <SButtonPromptContainer>
          <Button
            onClick={onCancel}
            background={themeColour}
            fontSize={18}
            inverted
            width={100}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            background={themeColour}
            fontSize={18}
            width={100}
          >
            Confirm
          </Button>
        </SButtonPromptContainer>
      </SInnerContainer>
    </SContainer>
  );
};
