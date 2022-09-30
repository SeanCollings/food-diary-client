import BarGraph from '@components/charts/bar-graph';
import BinaryHeatMap from '@components/charts/binary-heat-map';
import LineGraph from '@components/charts/line-graph';
import DropdownProfile from '@components/ui/dropdown-profile';
import {
  APP_THEME_DEFAULT,
  COLOURS,
  MEDIA_MOBILE,
  OPACITY_30,
  OPACITY_50,
} from '@utils/constants';
import { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const PADDING = 40;
const TITLE_WIDTH = 80;
const DATA_WIDTH = 60;
const BINARY_HEAT_MAP_HEIGHT = 280;
const BAR_GRAPH_HEIGHT = 320;

interface ISDataDisplayContainer {
  scrollVisible: boolean;
  scrollStart: boolean;
  scrollEnd: boolean;
  shadowHeight: number;
}

const SContainer = styled.div`
  background: ${COLOURS.white};
  flex: 2;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-bottom: 1px solid gainsboro;
  padding: ${PADDING}px;
  min-height: 540px;

  ${MEDIA_MOBILE} {
    padding: 20px;
  }
`;
const STopMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;
const SDropdownContainer = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  justify-content: end;

  ${MEDIA_MOBILE} {
    justify-content: space-evenly;
  }
`;

const STrendMenuContainer = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  position: relative;
  max-width: fit-content;
`;
const SMenuItem = styled.span<any>`
  cursor: pointer;
  padding-bottom: 4px;
  width: 140px;
  justify-content: center;
  display: flex;
  border-bottom: 2px solid transparent;
  font-size: 20px;

  ${MEDIA_MOBILE} {
    font-size: 16px;
    width: 120px;
  }

  :hover:not(.selected) {
    opacity: 0.6;
  }
`;
const SMenuUnderline = styled.div<any>`
  width: 140px;
  height: 2px;
  background: ${APP_THEME_DEFAULT.primary};
  position: absolute;
  bottom: 0;
  transition: 0.1s;

  left: ${({ setLeft }) => `${setLeft}%`};

  ${MEDIA_MOBILE} {
    width: 120px;
  }
`;

const SDataDisplayContainer = styled.div<ISDataDisplayContainer>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  justify-content: space-between;
  height: 100%;

  ${({ scrollVisible, scrollStart, shadowHeight }) =>
    scrollVisible &&
    !scrollStart &&
    `::before {
    display: block;
    position: absolute;
    left: 0;
    content: '';
    width: 8px;
    height: ${shadowHeight + 10}px;
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1)
    );
  }`}

  ${({ scrollVisible, scrollEnd, shadowHeight }) =>
    scrollVisible &&
    !scrollEnd &&
    `::after {
    display: block;
    position: absolute;
    right: 0px;
    content: '';
    width: 8px;
    height: ${shadowHeight + 10}px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1)
    );
  }`}
`;
const SChartScroll = styled.div`
  overflow-x: auto;
  position: relative;
  min-height: 280px;
  padding-top: 10px;

  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px ${COLOURS.black}${OPACITY_30};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLOURS.gray}${OPACITY_50};
  }
`;

const SDescriptorContainer = styled.div``;
const SDescriptor = styled.div`
  font-size: 12px;
`;

enum EProfileLifeTrends {
  FOOD_TRENDS = 'food_trends',
  WELLNESS_TRENDS = 'wellness_trends',
}
type TProfileLifeTrends = `${EProfileLifeTrends}`;

interface ITrendMenu {
  id: EProfileLifeTrends;
  title: string;
}

const TREND_MENU: ITrendMenu[] = [
  { id: EProfileLifeTrends.FOOD_TRENDS, title: 'Food Trends' },
  { id: EProfileLifeTrends.WELLNESS_TRENDS, title: 'Wellness Trends' },
];

interface ITrendMenuProps {
  selectedMenu: TProfileLifeTrends;
  onClick: (selectedMenu: TProfileLifeTrends) => void;
}

const TrendMenu: FC<ITrendMenuProps> = ({ selectedMenu, onClick }) => {
  return (
    <STrendMenuContainer>
      {TREND_MENU.map(({ id, title }) => (
        <SMenuItem
          className={`${selectedMenu === id ? 'selected' : ''}`}
          key={id}
          onClick={() => onClick(id)}
        >
          {title}
        </SMenuItem>
      ))}
      <SMenuUnderline setLeft={selectedMenu === 'food_trends' ? 0 : 50} />
    </STrendMenuContainer>
  );
};

const getChartWidth = (dataPoints: number) => {
  return TITLE_WIDTH + dataPoints * DATA_WIDTH;
};

const shadowHeightLookup: { [key in TProfileLifeTrends]: number } = {
  food_trends: BINARY_HEAT_MAP_HEIGHT,
  wellness_trends: BAR_GRAPH_HEIGHT,
};

type TWellnessOptions = 'beverages' | 'excercise';
interface IWellnessOption {
  id: TWellnessOptions;
  label: string;
}
type TTimePeriod = 'week' | 'month';
interface ITimePeriodOptions {
  id: TTimePeriod;
  label: string;
}

const WELLNESS_OPTIONS: IWellnessOption[] = [
  { id: 'beverages', label: 'Beverages' },
  { id: 'excercise', label: 'Excercise' },
];
const TIME_PERIOD_OPTIONS: ITimePeriodOptions[] = [
  { id: 'week', label: 'Current Week' },
  { id: 'month', label: 'Current Month' },
];

const ProfileLife: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timePeriod, setTimePeriod] = useState<ITimePeriodOptions>(
    TIME_PERIOD_OPTIONS[0]
  );
  const [wellnessOption, setWellnessOption] = useState<IWellnessOption>(
    WELLNESS_OPTIONS[0]
  );
  const [scrollVisible, setScrollVisible] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [selectedMenu, setSelectedMenu] =
    useState<TProfileLifeTrends>('food_trends');

  useEffect(() => {
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    const scrollWidth = scrollRef.current?.scrollWidth ?? 0;

    // console.log('containerWidth ::', containerWidth - PADDING - PADDING);
    // console.log('containerRef.current ::', containerRef.current);
    // console.log('scrollWidth ::', scrollWidth);
    // console.log('scrollRef.current ::', scrollRef.current);

    if (scrollWidth > containerWidth - PADDING - PADDING) {
      setScrollVisible(true);
    }
    // if (width < getChartWidth(7)) {
    //   setScrollVisible(true);
    // }
  }, []);

  useEffect(() => {
    const scrollCurrent = scrollRef.current;

    if (!scrollCurrent) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const { width } = rect;
      const isScrollVisible = width < getChartWidth(7);

      const scrollWidth = scrollRef.current?.scrollWidth ?? 0;
      const containerWidth =
        containerRef.current?.getBoundingClientRect().width ?? 0;

      const isScrollVisible2 = scrollWidth > containerWidth - PADDING - PADDING;

      // console.log('containerWidth ::', containerWidth - PADDING - PADDING);
      // console.log('scrollWidth ::', scrollWidth);
      // console.log('isScrollVisible2 ::', isScrollVisible2);

      if (isScrollVisible2 && !scrollVisible) {
        setScrollVisible(true);
        // console.log('SETTING');
      } else if (!isScrollVisible2 && scrollVisible) {
        setScrollVisible(false);
        // console.log('restet');
      }
      // if (isScrollVisible && !scrollVisible) {
      //   setScrollVisible(true);
      // } else if (!isScrollVisible && scrollVisible) {
      //   setScrollVisible(false);
      // }
    });
    resizeObserver.observe(scrollCurrent);

    return () => {
      resizeObserver.unobserve(scrollCurrent);
    };
  }, [scrollVisible]);

  useEffect(() => {
    const scrollCurrent = scrollRef.current;

    if (!scrollCurrent) {
      return;
    }

    const scrollListener = (e: Event) => {
      const { scrollLeft, scrollWidth } = scrollCurrent;
      const { width } = scrollCurrent.getBoundingClientRect();
      const isScrolledMax = scrollWidth - (width + scrollLeft) === 0;

      if (isScrolledMax && !scrollEnd) {
        setScrollEnd(true);
      } else if (!isScrolledMax && scrollEnd) {
        setScrollEnd(false);
      }

      if (scrollLeft === 0 && !scrollStart) {
        setScrollStart(true);
      } else if (scrollLeft !== 0 && scrollStart) {
        setScrollStart(false);
      }
    };

    scrollCurrent.addEventListener('scroll', scrollListener);

    return () => {
      scrollCurrent?.removeEventListener('scroll', scrollListener);
    };
  }, [scrollStart, scrollEnd]);

  const clickTrendMenuHandler = (menu: TProfileLifeTrends) => {
    if (selectedMenu !== menu) {
      setSelectedMenu(menu);
    }
  };

  const handleWellnessDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = WELLNESS_OPTIONS.find(
      (option) => option.id === event.target.value
    );

    if (selectedOption) {
      setWellnessOption(selectedOption);
    }
  };
  const handleTimeDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = TIME_PERIOD_OPTIONS.find(
      (option) => option.id === event.target.value
    );

    if (selectedOption) {
      setTimePeriod(selectedOption);
    }
  };

  return (
    <SContainer ref={containerRef}>
      <STopMenuContainer>
        <TrendMenu
          selectedMenu={selectedMenu}
          onClick={clickTrendMenuHandler}
        />
        <SDropdownContainer>
          <DropdownProfile
            id={'wellness-picker'}
            value={wellnessOption}
            options={WELLNESS_OPTIONS}
            width={120}
            hide={selectedMenu === 'food_trends'}
            onChange={handleWellnessDropdownChange}
          />
          <DropdownProfile
            id={'time-picker'}
            value={timePeriod}
            options={TIME_PERIOD_OPTIONS}
            width={120}
            onChange={handleTimeDropdownChange}
          />
        </SDropdownContainer>
      </STopMenuContainer>
      <SDataDisplayContainer
        shadowHeight={shadowHeightLookup[selectedMenu]}
        scrollVisible={scrollVisible}
        scrollStart={scrollStart}
        scrollEnd={scrollEnd}
      >
        <SChartScroll ref={scrollRef}>
          {selectedMenu === 'food_trends' && (
            <BinaryHeatMap
              height={BAR_GRAPH_HEIGHT}
              timePeriod={timePeriod.id}
            />
          )}
          {selectedMenu === 'wellness_trends' &&
            wellnessOption.id === 'beverages' && (
              <BarGraph height={BAR_GRAPH_HEIGHT} />
            )}
          {selectedMenu === 'wellness_trends' &&
            wellnessOption.id === 'excercise' && (
              <LineGraph height={BAR_GRAPH_HEIGHT} />
            )}
        </SChartScroll>
        <SDescriptorContainer>
          <SDescriptor>{`CAMOUFLAGE PAINT DOESN'T LIKE PAYING TAXES. A KICKINGLY PRODIGIOUS PROFILE COULD PLEASE EVEN THE MOST DEMANDING FOLLOWER OF FREUD.`}</SDescriptor>
        </SDescriptorContainer>
      </SDataDisplayContainer>
    </SContainer>
  );
};

export default ProfileLife;
