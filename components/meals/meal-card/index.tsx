import {
  COLOURS,
  MEDIA_MOBILE,
  MEDIA_TABLET,
  OPACITY_70,
} from '@utils/app.constants';
import { FC, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdEditNote } from 'react-icons/md';
import { getUniqueId } from '@utils/unique-id';
import ModalAddToMealCard from '@components/modals/add-to-meal-card';
import Modal from '@components/modals';
import { IMealContent, TMealType } from '@utils/interfaces';
import {
  getThemeColoursFromMealId,
  getThemeVarColor,
} from '@utils/theme-utils';
import { useDateSelectedContext } from '@store/date-selected-context';
import ModalEditMealCard from '@components/modals/edit-meal-card';
import { useMealEntriesContext } from '@store/meal-entries-context';
import { useTheme } from '@hooks/use-theme';

interface IScontainer {
  background: string;
  boxShadow: boolean;
}
interface ISIcon {
  background: string;
}
interface IScroll {
  background: string;
}

// background-image: ${({ background }) => `linear-gradient(to right,${background} 50%, ${background}${OPACITY_80})`};

// background-image: ${({ background }) => `linear-gradient(to right,${background}${OPACITY_80} 100%, ${background}${OPACITY_80})`};

const SContainer = styled.div<IScontainer>`
  cursor: pointer;
  // background: ${({ background }) => `${background}`};
  // background-image: linear-gradient(to bottom, #50abdf, #1f78aa);
  border-radius: 8px;
  padding: 16px;
  flex: 1 0 19%;
  max-width: 300px;
  min-width: 270px;
  height: 400px;
  scale: 1;
  backface-visibility: hidden;

  background-color: var(${({ background }) => background});

  :hover {
    scale: 1.01;

    ${({ boxShadow }) =>
      boxShadow && `box-shadow: 1px 1px 10px ${COLOURS.black}${OPACITY_70}`};

    ${MEDIA_MOBILE} {
      scale: 1;
    }

    &.has-content {
      background-color: transparent;
      ${({ background }) =>
        `background-image: linear-gradient(45deg, var(${background}) 80%, var(${background}__80))`};
    }
  }

  ${MEDIA_TABLET} {
    min-width: 250px;
    max-width: 100%;
  }

  ${MEDIA_MOBILE} {
    min-width: 100%;
  }
`;
const SHeaderContainer = styled.div`
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 16px;
  font-family: 'Architects Daughter';
`;
const SHeader = styled.div`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
`;
const SIcon = styled(MdEditNote)<ISIcon>`
  transition: 0.4s;
  background: ${({ background }) => `var(${background})`};
  border-radius: 10px;
  color: ${COLOURS.white};

  :hover {
    color: ${({ background }) => `var(${background})`};
    background: ${COLOURS.white};
  }
`;
const SContentContainer = styled.div<IScroll>`
  min-height: 0;
  height: calc(100% - 50px);
  width: 100%;
  overflow-y: auto;
  font-family: 'Architects Daughter';
  line-height: 1.4em;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ::-webkit-scrollbar {
    width: 6px;
    left: 5px;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: var(--text);
    border-radius: 10px;
    max-height: 20px;
  }
  :hover::-webkit-scrollbar-track {
    background-color: var(--text__40);
    border-radius: 10px;
  }
`;
const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SContent = styled.span`
  font-size: 17px;
`;
const SContentDescription = styled.span`
  font-size: 16px;
  padding-left: 6px;
  opacity: 0.8;
`;

interface IProps {
  id: TMealType;
  title: string;
}

const buildContent = (content: IMealContent, index: number) => {
  const { food, emoji, quantity } = content;

  if (!food) {
    return '';
  }

  const thisQuantity = quantity ? `${quantity} - ` : '';
  const thisEmoji = emoji?.nativeSkin ? `${emoji.nativeSkin}` : '';
  const constructedString = `${thisQuantity}${food}`;

  if (index % 2 === 0) {
    return `${thisEmoji} ${constructedString}`;
  }

  return `${constructedString} ${thisEmoji}`;
};

const Card: FC<IProps> = ({ id, title }) => {
  const { darkMode } = useTheme();
  const { dateSelectedISO } = useDateSelectedContext();
  const { mealEntries, addMealEntry, updateMealEntry, removeMealEntryById } =
    useMealEntriesContext();

  const [contents, setContents] = useState<IMealContent[]>([]);
  const [editMealContent, setEditMealContent] = useState<IMealContent | null>(
    null,
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const currentEntry = mealEntries[dateSelectedISO];
    setContents(currentEntry?.[id]?.contents || []);
  }, [dateSelectedISO, mealEntries, id]);

  const onClickHandler = () => {
    setShowAddModal(true);
  };
  const onModalAddClose = () => {
    if (!!editMealContent) {
      setShowEditModal(true);
    }
    setShowAddModal(false);
  };
  const onModalAddSubmit = (mealId: TMealType, newValues: IMealContent) => {
    setShowAddModal(false);
    setEditMealContent(null);

    if (!!newValues.food) {
      addMealEntry({ date: dateSelectedISO, mealId, newValues });
    }
  };
  const handleCardEdit = (event: MouseEvent<SVGElement>) => {
    setShowEditModal(true);
    event.stopPropagation();
  };
  const onModalEditClose = () => {
    setShowEditModal(false);
    setEditMealContent(null);
  };
  const onModalEditSubmit = () => {
    setShowEditModal(false);
    setEditMealContent(null);
  };
  const removeMealHandler = (contentId: string) => {
    removeMealEntryById({ date: dateSelectedISO, mealId: id, contentId });
  };
  const editMealHandler = (contentId: string) => {
    const editContent = contents?.find(({ id }) => id === contentId);
    setShowEditModal(false);

    if (editContent) {
      setEditMealContent(editContent);
      setShowAddModal(true);
    }
  };
  const confirmContentEditHandler = (
    updatedMealId: TMealType,
    updatedContent: IMealContent,
  ) => {
    updateMealEntry({
      date: dateSelectedISO,
      mealId: id,
      updatedMealId,
      updatedContent,
    });
    setShowAddModal(false);
    setEditMealContent(null);
  };

  const mealColour = getThemeColoursFromMealId(id);
  const themeColour = getThemeVarColor(mealColour);

  return (
    <>
      <SContainer
        background={themeColour}
        boxShadow={darkMode}
        onClick={onClickHandler}
        id="meal-card"
        title="Click to add"
        className={!!contents.length ? 'has-content' : ''}
      >
        <SHeaderContainer>
          <SHeader>{title}</SHeader>
          {!!contents.length && (
            <SIcon
              size={34}
              background={themeColour}
              title="Click to edit"
              onClick={handleCardEdit}
            />
          )}
        </SHeaderContainer>
        <SContentContainer background={themeColour}>
          {contents?.map((content, index) => (
            <SContentWrapper key={getUniqueId()}>
              <SContent>{buildContent(content, index)}</SContent>
              {!!content.description && (
                <SContentDescription>{`( ${content.description} )`}</SContentDescription>
              )}
            </SContentWrapper>
          ))}
        </SContentContainer>
      </SContainer>
      <Modal show={showAddModal || showEditModal} modalWidth={600}>
        {showAddModal ? (
          <ModalAddToMealCard
            mealId={id}
            content={editMealContent}
            onClose={onModalAddClose}
            onSubmit={onModalAddSubmit}
            onEditConfirm={confirmContentEditHandler}
          />
        ) : (
          <ModalEditMealCard
            mealId={id}
            contents={contents}
            onClose={onModalEditClose}
            onSubmit={onModalEditSubmit}
            onRemoveMeal={removeMealHandler}
            onEditMeal={editMealHandler}
          />
        )}
      </Modal>
    </>
  );
};

export default Card;
