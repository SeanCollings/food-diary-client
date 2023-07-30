import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import BarGraph, { BarGraphLegend } from '@components/charts/bar-graph';
import BinaryHeatMap from '@components/charts/binary-heat-map';
import LineGraph from '@components/charts/line-graph';
import DropdownProfile from '@components/ui/dropdown-profile';
import {
  ThemeBorderBottom,
  ThemeBorderRight,
} from '@components/ui/style-themed';
import { useRequestMealTrends } from '@hooks/request/trends/use-request-meal-trends';
import {
  useRequestBeverageTrends,
  useRequestExcerciseTrends,
} from '@hooks/request/trends/use-request-wellness-trends';
import {
  COLOURS,
  MEDIA_MOBILE,
  OPACITY_30,
  OPACITY_50,
} from '@utils/app.constants';
import {
  INFO_BEVERAGE_TREND,
  INFO_EXCERCISE_TREND,
  INFO_FOOD_TREND,
} from '@utils/constants/profile.constants';
import { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const SCROLL_TOLERANCE = 1;
const PADDING = 40;
const CHART_HEIGHT = 320;

interface ISDataDisplayContainer {
  scrollVisible: boolean;
  scrollStart: boolean;
  scrollEnd: boolean;
  shadowHeight: number;
}
interface ISMenuUnderline {
  setLeft: number;
}

const SContainer = styled.div`
  background-color: var(--bg-secondary);
  flex: 2;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: ${PADDING}px;
  min-height: 600px;
  ${ThemeBorderBottom}
  ${ThemeBorderRight}

  ${MEDIA_MOBILE} {
    padding: 20px;
    min-height: fit-content;
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
const SMenuItem = styled.span`
  cursor: pointer;
  padding-bottom: 4px;
  width: 142px;
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
const SMenuUnderline = styled.div<ISMenuUnderline>`
  width: 140px;
  height: 2px;
  background: var(--th-primary);
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

const SDescriptorContainer = styled.div`
  margin-bottom: 12px;
`;
const SDescriptor = styled.div`
  text-align: center;
  font-size: 12px;
`;
const SLegendContainer = styled.div`
  margin-top: -24px;
  justify-content: center;
  display: flex;

  ${MEDIA_MOBILE} {
    margin-top: 0;
  }
`;

enum EProfileLifeTrends {
  MEAL_TRENDS = 'meal_trends',
  WELLNESS_TRENDS = 'wellness_trends',
}
type TProfileLifeTrends = `${EProfileLifeTrends}`;

interface ITrendMenu {
  id: EProfileLifeTrends;
  title: string;
}

const TREND_MENU: ITrendMenu[] = [
  { id: EProfileLifeTrends.MEAL_TRENDS, title: 'Meal Trends' },
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
      <SMenuUnderline setLeft={selectedMenu === 'meal_trends' ? 0 : 50} />
    </STrendMenuContainer>
  );
};

const shadowHeightLookup: { [key in TProfileLifeTrends]: number } = {
  meal_trends: CHART_HEIGHT,
  wellness_trends: CHART_HEIGHT,
};

type TWellnessOptions = 'beverages' | 'excercise';
interface IWellnessOption {
  id: TWellnessOptions;
  label: string;
}
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
  const [mounted, setMounted] = useState(false);
  const [timePeriod, setTimePeriod] = useState<ITimePeriodOptions>(
    TIME_PERIOD_OPTIONS[0],
  );
  const [wellnessOption, setWellnessOption] = useState<IWellnessOption>(
    WELLNESS_OPTIONS[0],
  );
  const [scrollVisible, setScrollVisible] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [selectedMenu, setSelectedMenu] =
    useState<TProfileLifeTrends>('meal_trends');

  useEffect(() => {
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    const scrollWidth = scrollRef.current?.scrollWidth ?? 0;

    if (scrollWidth > containerWidth - PADDING - PADDING) {
      setScrollVisible(true);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    const scrollCurrent = scrollRef.current;

    if (!scrollCurrent) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const { width } = rect;

      const scrollWidth = scrollRef.current?.scrollWidth ?? 0;
      const isScrollVisible = width + SCROLL_TOLERANCE < scrollWidth;

      if (isScrollVisible && !scrollVisible) {
        setScrollVisible(true);
        setScrollEnd(false);
      } else if (!isScrollVisible && scrollVisible) {
        setScrollVisible(false);
      }
    });
    resizeObserver.observe(scrollCurrent);

    return () => {
      resizeObserver.unobserve(scrollCurrent);
    };
  }, [scrollVisible, selectedMenu]);

  useEffect(() => {
    const scrollCurrent = scrollRef.current;

    if (!scrollCurrent) {
      return;
    }

    const scrollListener = (e: Event) => {
      const { scrollLeft, scrollWidth } = scrollCurrent;
      const { width } = scrollCurrent.getBoundingClientRect();
      const isScrolledMax = scrollWidth < width + scrollLeft;

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
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedOption = WELLNESS_OPTIONS.find(
      (option) => option.id === event.target.value,
    );

    if (selectedOption) {
      setWellnessOption(selectedOption);
    }
  };
  const handleTimeDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = TIME_PERIOD_OPTIONS.find(
      (option) => option.id === event.target.value,
    );

    if (selectedOption) {
      setTimePeriod(selectedOption);
    }
  };

  const showFoodTrend = selectedMenu === 'meal_trends';
  const showBeverageTrend =
    selectedMenu === 'wellness_trends' && wellnessOption.id === 'beverages';
  const showExcerciseTrend =
    selectedMenu === 'wellness_trends' && wellnessOption.id === 'excercise';

  const { data: mealTrendData } = useRequestMealTrends(
    showFoodTrend,
    timePeriod.id,
  );
  const { data: beverageTrendData } = useRequestBeverageTrends(
    showBeverageTrend,
    timePeriod.id,
  );
  const { data: excerciseTrendData } = useRequestExcerciseTrends(
    showExcerciseTrend,
    timePeriod.id,
  );

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
            width={140}
            hide={selectedMenu === 'meal_trends'}
            onChange={handleWellnessDropdownChange}
          />
          <DropdownProfile
            id={'time-picker'}
            value={timePeriod}
            options={TIME_PERIOD_OPTIONS}
            width={140}
            isDisabled={selectedMenu === 'wellness_trends'}
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
          {showFoodTrend && (
            <BinaryHeatMap
              height={CHART_HEIGHT}
              timePeriod={timePeriod.id}
              data={mealTrendData}
            />
          )}
          {showBeverageTrend && (
            <BarGraph
              height={CHART_HEIGHT}
              timePeriod={timePeriod.id}
              data={beverageTrendData}
            />
          )}
          {showExcerciseTrend && (
            <LineGraph
              height={CHART_HEIGHT}
              timePeriod={timePeriod.id}
              data={excerciseTrendData}
            />
          )}
        </SChartScroll>
        <SDescriptorContainer>
          {showFoodTrend && <SDescriptor>{INFO_FOOD_TREND}</SDescriptor>}
          {showBeverageTrend && (
            <SDescriptor>{INFO_BEVERAGE_TREND}</SDescriptor>
          )}
          {showExcerciseTrend && (
            <SDescriptor>{INFO_EXCERCISE_TREND}</SDescriptor>
          )}
        </SDescriptorContainer>
      </SDataDisplayContainer>
      <SLegendContainer>
        <BarGraphLegend show={showBeverageTrend} />
      </SLegendContainer>
    </SContainer>
  );
};

export default ProfileLife;
