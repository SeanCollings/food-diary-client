import Input from '@components/ui/input';
import { COLOURS, MEDIA_MOBILE, OPACITY_40 } from '@utils/app.constants';
import { foodEmojis, IEmoji } from '@utils/food-emojis';
import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { useOnClickOutsideElementsArray } from '@hooks/use-onclick-outside-element';
import { EAddMealOptions } from '@utils/interfaces';

const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;
const SSelectedontainer = styled.div`
  width: 55px;
  height: 55px;
  border: 1px dashed ${COLOURS.gray_dark}${OPACITY_40};
  border-radius: 10px;
  margin: 0 auto;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;

  span:active {
    opacity: 0.3;
  }
`;
const SEmojisContainer = styled.div`
  width: 350px;
  position: relative;

  ${MEDIA_MOBILE} {
    width: 100%;
  }
`;
const SEmojiBox = styled.div`
  background: var(--bg-tertiary);
  width: calc(100% - 12px);
  position: absolute;
  padding: 12px;
  left: 6px;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(auto-fill, 34px);
  justify-content: space-between;
  grid-gap: 10px;

  max-height: 280px;
  overflow-y: auto;
  border-radius: 0 0 4px 4px;
  border: 1px solid var(--bg-primary);
  border-top: 0px;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLOURS.gray_dark};
    border-radius: 10px;
    max-height: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${COLOURS.gray_dark}${OPACITY_40};
    border-radius: 20px;
  }
`;
const SEmoji = styled.div`
  cursor: pointer;
  font-size: 24px;
  width: 34px;
  text-align: center;
`;

export type TSelectedEmoji = {
  name: string;
  nativeSkin: string;
} | null;
interface IEmojiPickerProps {
  value: TSelectedEmoji | null;
  borderColour: string;
  tabIndex?: number;
  onChange: (emoji: TSelectedEmoji | null) => void;
}

const getAllEmojis = (): IEmoji[] => {
  return foodEmojis.foods.map((food) => foodEmojis.emojis[food]);
};
const findEmojiBySearchTerm = (searchTerm: string) => {
  let value = searchTerm.toLowerCase();

  if (!value) {
    return getAllEmojis();
  }

  const specificEmojis = foodEmojis.foods.filter((food) =>
    food.includes(value),
  );
  const keywordEmojis: IEmoji[] = [];

  Object.keys(foodEmojis.emojis).forEach((emojiName) => {
    if (!specificEmojis.includes(emojiName)) {
      const emoji = foodEmojis.emojis[emojiName];

      const found = emoji.keywords.some((word) => word.includes(value));

      if (found) {
        keywordEmojis.push(emoji);
      }
    }
  });

  const foundEmojis: IEmoji[] = specificEmojis.map(
    (food) => foodEmojis.emojis[food],
  );

  const allEmojis = [...foundEmojis, ...keywordEmojis];

  return allEmojis;
};

const getEmojiDetail = (emoji: IEmoji): TSelectedEmoji => {
  const { name, skins } = emoji;
  return { name, nativeSkin: skins[0].native };
};

const EmojiPicker: FC<IEmojiPickerProps> = ({
  value,
  borderColour,
  tabIndex,
  onChange,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<TSelectedEmoji>(value);
  const [availableEmojis, setAvailableEmojis] = useState<IEmoji[]>([]);
  useOnClickOutsideElementsArray([inputRef, emojiBoxRef], () =>
    setAvailableEmojis([]),
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    const allEmojis = findEmojiBySearchTerm(value);

    if (!allEmojis && !!availableEmojis.length) {
      setAvailableEmojis([]);
    }
    if (!!allEmojis) {
      setAvailableEmojis(allEmojis);
    }
  };

  const selectEmojiHandler = (emoji: IEmoji) => {
    onChange(getEmojiDetail(emoji));
    setSelectedEmoji(getEmojiDetail(emoji));
    setSearchTerm('');
    setAvailableEmojis([]);
  };
  const removeEmojiHandler = () => {
    if (selectedEmoji) {
      setSelectedEmoji(null);
      onChange(null);
    }
  };
  const handleTabPress = () => {
    if (availableEmojis.length) {
      document.getElementById('available-emoji-0')?.focus();
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      if (event.target instanceof HTMLElement && event.target.tabIndex) {
        const index = event.target.tabIndex - 1;
        selectEmojiHandler(availableEmojis[index]);
      }
    }
  };
  const handleOnMouseDown = () => {
    if (!availableEmojis.length && !searchTerm.length) {
      const allEmojis = getAllEmojis();
      setAvailableEmojis(allEmojis);
    }
  };

  return (
    <SContainer>
      <SSelectedontainer
        title={selectedEmoji?.name || ''}
        onClick={removeEmojiHandler}
      >
        <span>{selectedEmoji?.nativeSkin || ''}</span>
      </SSelectedontainer>
      <SEmojisContainer ref={inputRef}>
        <Input
          id={EAddMealOptions.EMOJI_PICKER}
          tabIndex={tabIndex}
          value={searchTerm}
          placeholder="Search for emoji"
          borderColour={borderColour}
          onTabPressed={handleTabPress}
          onChange={handleOnChange}
          onMouseDown={handleOnMouseDown}
        >
          <MdSearch size={30} color={`var(${borderColour}__80)`} />
        </Input>
        {!!availableEmojis.length && (
          <SEmojiBox ref={emojiBoxRef}>
            {availableEmojis.map((emoji, index) => (
              <SEmoji
                id={`available-emoji-${index}`}
                tabIndex={index + 1}
                key={emoji.id}
                title={emoji.name}
                onKeyDown={handleKeyDown}
                onClick={() => selectEmojiHandler(emoji)}
              >
                {emoji.skins[0].native}
              </SEmoji>
            ))}
          </SEmojiBox>
        )}
      </SEmojisContainer>
    </SContainer>
  );
};

export default EmojiPicker;
