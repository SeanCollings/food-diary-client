import { FC, useState } from 'react';
import styled from 'styled-components';
import { ModalHeader } from '@components/modals/styled';
import { ALL_MEAL_CARDS, COLOURS, MEDIA_MOBILE } from '@utils/app.constants';
import {
  getThemeColoursFromMealId,
  getThemeVarColor,
} from '@utils/theme-utils';
import { IMealContent, TMealType } from '@utils/interfaces';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import RadioButton from '@components/ui/radio-button';

interface ISColour {
  colour: string;
}
interface IPromptButton {
  colour?: string;
  isConfirm?: boolean;
}

const SContainer = styled.div`
  overflow-x: hidden;
  margin: auto;
  width: 600px;
  background-color: var(--bg-secondary);
`;
const SContentContainer = styled.div`
  padding: 40px 20px;
  max-height: 400px;
  min-height: 220px;
  position: relative;
`;
const SConfirmPrompt = styled.div`
  position: absolute;
  border: 1px solid ${COLOURS.gray_dark};
  border-radius: 4px;
  width: 80%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  padding: 16px 40px;
  text-align: center;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 17px;
  z-index: 1;
  background-color: var(--bg-secondary);
`;
const SButtonPromptContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const SPromptButton = styled.button<IPromptButton>`
  cursor: pointer;
  border: 1px solid ${COLOURS.gray_dark};
  background: transparent;
  border-radius: 4px;
  width: 80px;
  font-size: 17px;
  padding: 8px;
  font-weight: 200;
  color: var(--text);

  :hover {
    scale: 1.05;
  }
  :active {
    opacity: 0.5;
  }

  ${({ isConfirm, colour }) => isConfirm && `background: var(${colour})`}
`;
const SContentWrapper = styled.div<ISColour>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  min-height: 100px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-button {
    height: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ colour }) => `var(${colour}__80)`};
    border-radius: 10px;
    max-height: 20px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;
const SEmpty = styled.span`
  text-align: center;
  height: 30px;
  font-size: 17px;
`;
const SContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 34px;
`;
const SContentDisplayContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 30px;
  overflow: hidden;
  width: 100%;
  height: 34px;
`;
const SRadioLabel = styled.label`
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }

  ${MEDIA_MOBILE} {
    :hover {
      opacity: 1;
    }
    :active {
      opacity: 0.6;
    }
  }
`;
const SButtonContainer = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
`;
const SButton = styled.button`
  margin: auto;
  cursor: pointer;
  border: none;
  background: transparent;

  :hover {
    scale: 1.05;
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
`;

interface IModalEditMealCardProps {
  mealId: TMealType;
  contents: IMealContent[];
  onClose: () => void;
  onSubmit: () => void;
  onRemoveMeal: (id: string) => void;
  onEditMeal: (id: string) => void;
}
interface IContentDisplayProps {
  content: IMealContent;
  mealColour: string;
  onRadioSelected: (id: string) => void;
}

const ContentDisplay: FC<IContentDisplayProps> = ({
  content: { food, id, quantity, emoji },
  mealColour,
  onRadioSelected,
}) => {
  const onChangeHandler = (value: string) => {
    onRadioSelected(value);
  };

  const emojiLabel = emoji?.nativeSkin ? `${emoji?.nativeSkin} ` : '';
  const quantityLabel = quantity ? `${quantity} - ` : '';
  const label = `${emojiLabel}${quantityLabel}${food}`;

  return (
    <SContentDisplayContainer>
      <RadioButton
        id={id}
        onChange={onChangeHandler}
        value={id}
        name={'edit-meal-card'}
        colour={mealColour}
      />
      <SRadioLabel htmlFor={`${id}-radio`}>{label}</SRadioLabel>
    </SContentDisplayContainer>
  );
};

const ModalEditMealCard: FC<IModalEditMealCardProps> = ({
  mealId,
  contents = [],
  onClose,
  onSubmit,
  onRemoveMeal,
  onEditMeal,
}) => {
  const [isRemoveItemId, setIsRemoveItemId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState('');

  const mealColour = getThemeColoursFromMealId(mealId);
  const themeColour = getThemeVarColor(mealColour);
  const mealTile =
    ALL_MEAL_CARDS.find((meal) => meal.id === mealId)?.title || '';

  const handleOnClose = () => {
    onClose();
  };
  const handleOnSubmit = () => {
    onSubmit();
  };
  const handleContentSelected = (id: string) => {
    setSelectedItem(id);
  };
  const handleOnRemoveMeal = () => {
    if (isRemoveItemId) {
      onRemoveMeal(isRemoveItemId);
      setSelectedItem('');
      setIsRemoveItemId(null);
    }
  };

  return (
    <SContainer>
      <ModalHeader
        title={`Edit ${mealTile}`}
        mealColour={themeColour}
        onClose={handleOnClose}
      />
      <SContentContainer>
        {!!isRemoveItemId && (
          <SConfirmPrompt>
            Are you sure you want to permanetly delete this item?
            <SButtonPromptContainer>
              <SPromptButton
                onClick={() => handleOnRemoveMeal()}
                isConfirm
                colour={themeColour}
              >
                Confirm
              </SPromptButton>
              <SPromptButton onClick={() => setIsRemoveItemId(null)}>
                Cancel
              </SPromptButton>
            </SButtonPromptContainer>
          </SConfirmPrompt>
        )}
        <SContentWrapper colour={themeColour}>
          {!contents.length && <SEmpty>{`${mealTile} is empty`}</SEmpty>}
          {contents.map((content) => (
            <SContents key={content.id}>
              <ContentDisplay
                content={content}
                mealColour={themeColour}
                onRadioSelected={handleContentSelected}
              />
              {selectedItem === content.id.toString() && (
                <SButtonContainer>
                  <SButton onClick={() => onEditMeal(content.id)} title="edit">
                    <MdEdit size={28} color={`var(${themeColour})`} />
                  </SButton>
                  <SButton
                    onClick={() => setIsRemoveItemId(content.id)}
                    title="delete"
                  >
                    <MdDeleteForever size={28} color={COLOURS.gray_dark} />
                  </SButton>
                </SButtonContainer>
              )}
            </SContents>
          ))}
        </SContentWrapper>
      </SContentContainer>
    </SContainer>
  );
};

export default ModalEditMealCard;
