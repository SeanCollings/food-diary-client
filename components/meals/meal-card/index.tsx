import {
  APP_THEME_DEFAULT,
  COLOURS,
  MEDIA_MOBILE,
  MEDIA_TABLET,
  OPACITY_70,
  OPACITY_80,
} from '@utils/constants';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdAddCircle } from 'react-icons/md';
import { getUniqueId } from '@utils/unique-id';
import ModalAddFood from '@components/modals/add-food';
import Modal from '@components/modals';
import { IMealContent, TMealType } from '@utils/interfaces';
import { getMealThemeColour } from '@utils/theme-utils';
import { useDiaryEntriesContext } from '@store/diary-entries-context';
import { useDateSelectedContext } from '@store/date-selected-context';

interface IScontainer {
  background: string;
}
interface IScroll extends IScontainer {
  fontColor: string;
}

const SContainer = styled.div<IScontainer>`
  cursor: pointer;
  background: ${({ background }) => `${background}`};
  border-radius: 20px;
  padding: 20px;
  flex: 0 0 18%;
  max-width: 300px;
  min-width: 250px;
  height: 400px;

  :hover {
    background: ${({ background }) => `${background}${OPACITY_80}`};
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
`;
const SIcon = styled(MdAddCircle)`
  :hover {
    border-radius: 50%;
    scale: 1.1;
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
  const { dateSelectedISO } = useDateSelectedContext();
  const { diaryEntries, updateMealEntry } = useDiaryEntriesContext();

  const [contents, setContents] = useState<IMealContent[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentEntry = diaryEntries[dateSelectedISO];
    setContents(currentEntry?.meals[id]?.contents || []);
  }, [dateSelectedISO, diaryEntries, id]);

  const onClickHandler = () => {
    setShowModal(true);
  };
  const onModalClose = () => {
    setShowModal(false);
  };
  const onModalSubmit = (mealId: TMealType, newValues: IMealContent) => {
    setShowModal(false);

    if (!!newValues.food) {
      updateMealEntry({ date: dateSelectedISO, mealId, newValues });
    }
  };

  const background = getMealThemeColour(APP_THEME_DEFAULT, id);

  return (
    <>
      <SContainer
        background={background}
        onClick={onClickHandler}
        id="meal-card"
        title="Click to add food"
      >
        <SHeaderContainer>
          <SHeader>{title}</SHeader>
          <SIcon size={34} color={APP_THEME_DEFAULT.backgroundSecondary} />
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
      <Modal show={showModal} modalWidth={600}>
        <ModalAddFood
          mealId={id}
          primaryColour={background}
          onClose={onModalClose}
          onSubmit={onModalSubmit}
        />
      </Modal>
    </>
  );
};

export default Card;
