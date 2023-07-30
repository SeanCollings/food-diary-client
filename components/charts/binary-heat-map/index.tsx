import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IRequestTrendData } from '@hooks/request/trends/use-request-meal-trends';
import { useTheme } from '@hooks/use-theme';
import { ALL_MEAL_CARDS } from '@utils/app.constants';
import { EMealType } from '@utils/interfaces';
import { getUniqueId } from '@utils/unique-id';
import styled from 'styled-components';

const LEGEND_HEIGHT = 30;
const TITLE_WIDTH = 80;
const COLUMN_WIDTH_MAX = 100;
const COLUMN_WIDTH_MIN = 24;
const CIRCLE_WIDTH_MAX = 30;
const CIRCLE_WIDTH_MIN = 16;
const CIRCLE_HEIGHT_MIN = 16;
const MIN_DATA_COLUMNS = 7;

interface ISDataContainer {
  height: number;
}
interface ISDataTitle {
  border: string;
}
interface ISDataItem {
  border: string;
}
interface ISMealDetailContainer {
  boxWidth: number;
  totalValues: number;
  border: string;
}
interface ISHAxisContainer {
  boxWidth: number;
  totalValues: number;
  border: string;
}
interface ISCircleDisplay {
  colour: string;
  size: number;
  dataHeight: number;
}
interface ISHiddenCircle {
  dataHeight: number;
}
interface ISHorizontalLine {
  colour: string;
  width: number;
}

const SContainer = styled.div`
  max-width: fit-content;
`;
const SDataContainer = styled.div<ISDataContainer>`
  display: grid;
  grid-template-columns: 0;
  grid-template-rows: repeat(5, auto) ${LEGEND_HEIGHT}px;
  height: ${({ height }) => height}px;
`;
const SDataTitle = styled.span<ISDataTitle>`
  display: flex;
  align-items: center;
  padding: 0 8px;

  :not(.last-item) {
    border-bottom: 1px solid var(${({ border }) => border});
  }
`;
const SDataItem = styled.span<ISDataItem>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SMealDetailContainer = styled.div<ISMealDetailContainer>`
  display: grid;
  grid-template-columns: ${({ totalValues, boxWidth }) =>
    `${TITLE_WIDTH}px repeat(${totalValues}, ${boxWidth}px)`};

  span:not(:first-child):not(:last-child) {
    border-right: 1px solid var(${({ border }) => border});
  }
`;
const SData = styled(SDataItem)`
  :not(.last-item) {
    border-bottom: 1px solid var(${({ border }) => border});
  }
`;
const SCircleDisplay = styled.span<ISCircleDisplay>`
  width: ${({ size }) => size}px;
  height: ${({ dataHeight }) => dataHeight}px;
  border-radius: 15px;
  z-index: 2;
  background-color: ${({ colour }) => `var(--th-${colour})`};
`;
const SHiddenCircle = styled.div<ISHiddenCircle>`
  height: ${({ dataHeight }) => dataHeight}px;
`;
const SHorizontalLine = styled.div<ISHorizontalLine>`
  position: absolute;
  height: 4px;
  left: 50%;
  width: ${({ width }) => width}px;
  background-color: ${({ colour }) => `var(--th-${colour})`};
`;

const SHAxisContainer = styled.div<ISHAxisContainer>`
  ::before {
    content: '';
  }

  display: grid;
  font-size: 12px;
  grid-template-columns: ${({ totalValues, boxWidth }) =>
    `${TITLE_WIDTH}px repeat(${totalValues}, ${boxWidth}px)`};

  span:not(:last-child) {
    border-right: 1px solid var(${({ border }) => border});
  }
`;
const SHAxisKey = styled(SDataItem)``;

const lastItem = <T extends unknown>(array: T[], index: number) => {
  if (!array?.length) {
    return false;
  }

  return index === array.length - 1;
};

interface IBinaryHeatMapProps {
  height: number;
  timePeriod: TTimePeriod;
  data: IRequestTrendData;
}

const BinaryHeatMap: React.FC<IBinaryHeatMapProps> = ({
  height,
  timePeriod,
  data = {},
}) => {
  const { darkMode } = useTheme();

  const mealData = timePeriod === 'week' ? data.week : data.month;
  const boxWidth = timePeriod === 'week' ? COLUMN_WIDTH_MAX : COLUMN_WIDTH_MIN;
  const dataSize = timePeriod === 'week' ? CIRCLE_WIDTH_MAX : CIRCLE_WIDTH_MIN;
  const dataHeight =
    timePeriod === 'week' ? CIRCLE_WIDTH_MAX : CIRCLE_HEIGHT_MIN;

  const MEAL_TYPE_COLOUR = {
    [EMealType.BREAKFAST]: 'secondary',
    [EMealType.SNACK_1]: 'quaternary',
    [EMealType.LUNCH]: 'primary',
    [EMealType.SNACK_2]: 'quaternary',
    [EMealType.DINNER]: 'tertiary',
  };

  const borderColour = darkMode ? `--th-quaternary__20` : `--th-quaternary__50`;

  return (
    <SContainer>
      <SDataContainer height={height}>
        {ALL_MEAL_CARDS.map(({ id, title }, mealIindex) => {
          const className = lastItem(ALL_MEAL_CARDS, mealIindex)
            ? 'last-item'
            : '';

          return (
            <SMealDetailContainer
              key={id}
              totalValues={mealData?.totalValues ?? MIN_DATA_COLUMNS}
              boxWidth={boxWidth}
              border={borderColour}
            >
              <SDataTitle className={className} border={borderColour}>
                {title}
              </SDataTitle>
              {[...Array(mealData?.totalValues)].map((_, index) => {
                if (!mealData) {
                  return null;
                }

                const data = mealData?.mealsPerDay[index];
                const colour = MEAL_TYPE_COLOUR[id];
                const hasValue = !!data?.meals[mealIindex];
                const isLastValue =
                  mealData.mealsPerDay[index + 1] === undefined;
                const nextValueZero =
                  mealData.mealsPerDay[index + 1]?.meals[mealIindex] === 0;
                const showLine = hasValue && !isLastValue && !nextValueZero;

                return (
                  <SData
                    key={`data-${mealIindex}-${index}`}
                    className={className}
                    border={borderColour}
                  >
                    {hasValue ? (
                      <SCircleDisplay
                        colour={colour}
                        size={dataSize}
                        dataHeight={dataHeight}
                        title={`total: ${mealData.mealTotals[id]}`}
                      />
                    ) : (
                      <SHiddenCircle dataHeight={dataHeight} />
                    )}
                    {showLine && (
                      <SHorizontalLine colour={colour} width={boxWidth} />
                    )}
                  </SData>
                );
              })}
            </SMealDetailContainer>
          );
        })}
        <SHAxisContainer
          totalValues={mealData?.totalValues ?? MIN_DATA_COLUMNS}
          boxWidth={boxWidth}
          border={borderColour}
        >
          {mealData?.legend?.map((key) => (
            <SHAxisKey key={getUniqueId()} border={borderColour}>
              {key}
            </SHAxisKey>
          ))}
        </SHAxisContainer>
      </SDataContainer>
    </SContainer>
  );
};

export default BinaryHeatMap;
