import {
  COLOURS,
  MEDIA_MOBILE,
  MEDIA_TABLET,
  OPACITY_40,
  OPACITY_50,
  OPACITY_70,
} from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { MdAddCircle } from 'react-icons/md';
import { getUniqueId } from '@utils/unique-id';
import ModalAddFood from '@components/modals/add-food';
import Modal from '@components/modals';

interface IScontainer {
  background: string;
}
interface IScroll extends IScontainer {
  fontColor: string;
}

const SContainer = styled.div<IScontainer>`
  cursor: pointer;
  background: ${({ background }) => `${background}${OPACITY_40}`};
  border-radius: 20px;
  padding: 20px;
  flex: 0 0 18%;
  max-width: 300px;
  min-width: 250px;
  height: 400px;

  :hover {
    background: ${({ background }) => `${background}${OPACITY_50}`};
    // box-shadow: 1px 1px 10px #6c6a6a;
    // box-shadow: 0px 10px 40px -10px #6c6a6a;
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
    // box-shadow: 0px 0px 10px #6c6a6a;
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
    background-color: ${({ background }) => `${background}${OPACITY_40}`};
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
  color: ${COLOURS.black}${OPACITY_70};
`;

export interface IContent {
  emoji?: string;
  serving?: string;
  measurement?: string;
  food: string;
  description?: string;
}

interface IProps {
  id: string;
  title: string;
  primary: string;
  secondary: string;
  contents: IContent[];
}

interface IBuildContent extends IContent {
  index: number;
}
const buildContent = (content: IContent, index: number) => {
  const { food, description, emoji, serving, measurement } = content;
  if (!food) {
    return '';
  }

  const thisServing = serving ? `${serving} ` : '';
  const thisMeasurement = measurement ? `${measurement} - ` : '';
  const preEmoji = emoji ? `${emoji} ` : '';
  const postEmoji = emoji ? ` ${emoji}` : '';
  const constructedString = `${thisServing}${thisMeasurement}${food}`;

  if (index % 2 === 0) {
    return `${preEmoji}${constructedString}`;
  }

  return `${constructedString}${postEmoji}`;
};

const Card: FC<IProps> = ({ id, title, primary, secondary, contents }) => {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    setShowModal(true);
    console.log('clicked ::', id);
  };

  const onModalClose = () => {
    console.log('CLOSING');
    setShowModal(false);
  };
  const onModalSubmit = (properties: any) => {
    console.log('properties', properties);
    setShowModal(false);
  };

  return (
    <>
      <SContainer
        background={primary}
        onClick={onClickHandler}
        id="meal-card"
        title="Click to add food"
      >
        <SHeaderContainer>
          <SHeader>{title}</SHeader>
          <SIcon size={34} color={secondary} />
        </SHeaderContainer>
        <SContentContainer background={primary} fontColor={secondary}>
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
          primaryColour={primary}
          onClose={onModalClose}
          onSubmit={onModalSubmit}
        />
      </Modal>
    </>
  );
};

export default Card;
