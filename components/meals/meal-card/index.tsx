import {
  APP_THEME_DEFAULT,
  COLOURS,
  MEDIA_MOBILE,
  MEDIA_TABLET,
  OPACITY_70,
  OPACITY_80,
} from '@utils/constants';
import { FC, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdEditNote } from 'react-icons/md';
import { getUniqueId } from '@utils/unique-id';
import ModalAddToMealCard from '@components/modals/add-to-meal-card';
import Modal from '@components/modals';
import { IMealContent, TMealType } from '@utils/interfaces';
import { getMealThemeColour } from '@utils/theme-utils';
import { useDateSelectedContext } from '@store/date-selected-context';
import ModalEditMealCard from '@components/modals/edit-meal-card';
import { useMealEntriesContext } from '@store/meal-entries-context';
import { useTheme } from '@hooks/use-theme';

interface IScontainer {
  background: string;
  hasContent: boolean;
}
interface ISIcon {
  background: string;
}
interface IScroll {
  background: string;
  fontColor: string;
}
// background-image: ${({ background }) => `linear-gradient(to right,${background} 50%, ${background}${OPACITY_80})`};

// background-image: ${({ background }) => `linear-gradient(to right,${background}${OPACITY_80} 100%, ${background}${OPACITY_80})`};

const SContainer = styled.div<IScontainer>`
  cursor: pointer;
  // background: ${({ background }) => `${background}`};
  // background-image: linear-gradient(to bottom, #50abdf, #1f78aa);
  border-radius: 8px;
  padding: 20px;
  flex: 0 0 18%;
  max-width: 300px;
  min-width: 250px;
  height: 400px;
  transition: scale 0.1s;

  ${({ hasContent, background }) =>
    hasContent
      ? `background-image: linear-gradient(225deg,${background} 20%, ${background}${OPACITY_80})`
      : `background: ${background}`};

  :hover {
    ${({ hasContent, background }) =>
      hasContent
        ? `background-image: linear-gradient(225deg,${background}${OPACITY_80} 100%, ${background}${OPACITY_80})`
        : `background: ${background}${OPACITY_80}`};
    // background: ${({ background }) => `${background}${OPACITY_80}`};
    box-shadow: 1px 1px 10px #6c6a6a;
    scale: 1.01;
  }

  ${MEDIA_TABLET} {
    min-width: calc(50% - 20px);
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
  background: ${({ background }) => `${background}`};
  border-radius: 10px;
  color: ${APP_THEME_DEFAULT.backgroundSecondary};

  :hover {
    color: ${({ background }) => `${background}`};
    background: ${APP_THEME_DEFAULT.backgroundSecondary};
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
    background-color: ${({ fontColor }) => `${fontColor}${OPACITY_70}`};
    border-radius: 10px;
    max-height: 20px;
  }
  :hover::-webkit-scrollbar-track {
    background-color: ${({ background }) => `${background}`};
    border-radius: 10px;
  }
`;
const SContentWrapper = styled.div``;
const SContent = styled.span`
  font-size: 17px;
`;
const SContentDescription = styled.span`
  font-size: 16px;
  padding-left: 6px;
  color: ${COLOURS.black}${OPACITY_80};
`;

interface IProps {
  id: TMealType;
  title: string;
}

const buildContent = (content: IMealContent, index: number) => {
  const { food, emoji, serving, measurement } = content;
  if (!food) {
    return '';
  }

  const thisServing = serving ? `${serving} ` : '';
  const thisMeasurement = measurement ? `${measurement} - ` : '';
  const preEmoji = emoji?.nativeSkin ? `${emoji.nativeSkin} ` : '';
  const postEmoji = emoji?.nativeSkin ? ` ${emoji.nativeSkin}` : '';
  const constructedString = `${thisServing}${thisMeasurement}${food}`;

  if (index % 2 === 0) {
    return `${preEmoji}${constructedString}`;
  }

  return `${constructedString}${postEmoji}`;
};

const Card: FC<IProps> = ({ id, title }) => {
  const theme = useTheme();
  const { dateSelectedISO } = useDateSelectedContext();
  const { mealEntries, addMealEntry, updateMealEntry, removeMealEntryById } =
    useMealEntriesContext();

  const [contents, setContents] = useState<IMealContent[]>([]);
  const [editMealContent, setEditMealContent] = useState<IMealContent | null>(
    null
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
  const removeMealHandler = (contentId: number) => {
    removeMealEntryById({ date: dateSelectedISO, mealId: id, contentId });
  };
  const editMealHandler = (contentId: number) => {
    const editContent = contents?.find(({ id }) => id === contentId);
    setShowEditModal(false);

    if (editContent) {
      setEditMealContent(editContent);
      setShowAddModal(true);
    }
  };
  const confirmContentEditHandler = (
    updatedMealId: TMealType,
    updatedContent: IMealContent
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

  const background = getMealThemeColour(theme, id);

  return (
    <>
      <SContainer
        hasContent={!!contents.length}
        background={background}
        onClick={onClickHandler}
        onDoubleClick={() => console.log('DOUBLE CLICKED')}
        id="meal-card"
        title="Click to add"
      >
        <SHeaderContainer>
          <SHeader>{title}</SHeader>
          {!!contents.length && (
            <SIcon
              size={34}
              background={background}
              title="Click to edit"
              onClick={handleCardEdit}
            />
          )}
        </SHeaderContainer>
        <SContentContainer
          background={background}
          fontColor={APP_THEME_DEFAULT.backgroundSecondary}
        >
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
      <Modal show={showAddModal} modalWidth={600}>
        <ModalAddToMealCard
          mealId={id}
          content={editMealContent}
          onClose={onModalAddClose}
          onSubmit={onModalAddSubmit}
          onEditConfirm={confirmContentEditHandler}
        />
      </Modal>
      <Modal show={showEditModal} modalWidth={600}>
        <ModalEditMealCard
          mealId={id}
          contents={contents}
          onClose={onModalEditClose}
          onSubmit={onModalEditSubmit}
          onRemoveMeal={removeMealHandler}
          onEditMeal={editMealHandler}
        />
      </Modal>
    </>
  );
};

export default Card;
