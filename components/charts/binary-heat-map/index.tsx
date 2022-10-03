import { useTheme } from '@hooks/use-theme';
import {
  ALL_MEAL_CARDS,
  APP_THEME_DEFAULT,
  COLOURS,
  OPACITY_20,
  OPACITY_40,
} from '@utils/constants';
import { EMealType } from '@utils/interfaces';
import { getUniqueId } from '@utils/unique-id';
import styled from 'styled-components';

const LEGEND_HEIGHT = 30;
const TITLE_WIDTH = 80;
const COLUMN_WIDTH_MAX = 100;
const COLUMN_WIDTH_MIN = 24;
const CIRCLE_WIDTH_MAX = 30;
const CIRCLE_WIDTH_MIN = 14;

interface ISDataContainer {
  height: number;
}
interface ISMealDetailContainer {
  boxWidth: number;
  totalValues: number;
}
interface ISHAxisContainer {
  boxWidth: number;
  totalValues: number;
}
interface ISCircleDisplay {
  colour: string;
  size: number;
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
const SDataTitle = styled.span`
  display: flex;
  align-items: center;
  padding: 0 8px;

  :not(.last-item) {
    border-bottom: 1px solid ${COLOURS.gray}${OPACITY_20};
  }
`;
const SDataItem = styled.span`
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
    border-right: 1px solid ${COLOURS.gray}${OPACITY_40};
  }
`;
const SData = styled(SDataItem)`
  :not(.last-item) {
    border-bottom: 1px solid ${COLOURS.gray}${OPACITY_20};
  }
`;
const SCircleDisplay = styled.span<ISCircleDisplay>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ colour }) => colour};
  border-radius: 50%;
  z-index: 2;
`;
const SHorizontalLine = styled.div<ISHorizontalLine>`
  position: absolute;
  height: 2px;
  left: 50%;
  width: ${({ width }) => width}px;
  background: ${({ colour }) => colour};
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
    border-right: 1px solid ${COLOURS.gray}${OPACITY_40};
  }
`;
const SHAxisKey = styled(SDataItem)``;

const lastItem = <T extends unknown>(array: T[], index: number) => {
  if (!array?.length) {
    return false;
  }

  return index === array.length - 1;
};

interface IFoodTrendData {
  type: 'week' | 'month';
  totalValues: number;
  legend: string[];
  data: { id: string; meals: (0 | 1)[] }[];
  totals: { [key in EMealType]: number };
}

const MOCK_DATA_MONTH: IFoodTrendData = {
  type: 'month',
  totalValues: 31,
  legend: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ],
  data: [
    { id: 'month_1', meals: [1, 0, 1, 1, 0] },
    { id: 'month_2', meals: [1, 0, 1, 1, 1] },
    { id: 'month_3', meals: [1, 0, 0, 1, 1] },
    { id: 'month_4', meals: [0, 1, 1, 0, 1] },
    { id: 'month_5', meals: [0, 0, 1, 1, 0] },
    { id: 'month_6', meals: [0, 1, 0, 1, 1] },
    { id: 'month_7', meals: [1, 0, 1, 1, 1] },
    { id: 'month_8', meals: [1, 0, 1, 1, 1] },
    { id: 'month_9', meals: [1, 0, 1, 0, 1] },
    { id: 'month_10', meals: [1, 0, 1, 1, 1] },
    { id: 'month_11', meals: [1, 1, 1, 1, 1] },
    { id: 'month_12', meals: [0, 0, 1, 0, 1] },
    { id: 'month_13', meals: [1, 0, 1, 1, 1] },
    { id: 'month_14', meals: [1, 0, 1, 1, 1] },
    { id: 'month_15', meals: [1, 0, 1, 0, 0] },
    { id: 'month_16', meals: [1, 1, 1, 1, 1] },
    { id: 'month_17', meals: [1, 0, 0, 0, 1] },
    { id: 'month_18', meals: [1, 1, 0, 1, 1] },
    { id: 'month_19', meals: [1, 0, 1, 1, 1] },
    { id: 'month_20', meals: [1, 0, 1, 1, 1] },
    { id: 'month_21', meals: [1, 0, 1, 0, 0] },
    { id: 'month_22', meals: [0, 0, 0, 1, 1] },
    { id: 'month_23', meals: [1, 1, 1, 1, 1] },
    { id: 'month_24', meals: [1, 1, 1, 1, 1] },
    { id: 'month_25', meals: [1, 0, 1, 1, 1] },
    { id: 'month_26', meals: [1, 0, 1, 1, 0] },
    { id: 'month_27', meals: [0, 1, 0, 0, 1] },
    { id: 'month_28', meals: [1, 1, 1, 1, 1] },
    { id: 'month_29', meals: [1, 0, 1, 1, 1] },
    { id: 'month_30', meals: [0, 0, 0, 1, 1] },
    { id: 'month_31', meals: [1, 0, 1, 1, 0] },
  ],
  totals: {
    breakfast: 23,
    snack_1: 9,
    lunch: 24,
    snack_2: 23,
    dinner: 26,
  },
};
const MOCK_DATA_WEEK: IFoodTrendData = {
  type: 'week',
  totalValues: 7,
  legend: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  data: [
    {
      id: 'mon',
      meals: [1, 1, 1, 1, 1],
    },
    {
      id: 'tue',
      meals: [0, 1, 1, 0, 1],
    },
    {
      id: 'wed',
      meals: [1, 0, 1, 1, 1],
    },
    {
      id: 'thu',
      meals: [1, 1, 1, 1, 1],
    },
    {
      id: 'fri',
      meals: [0, 1, 1, 1, 1],
    },
    {
      id: 'sat',
      meals: [1, 1, 0, 1, 1],
    },
    {
      id: 'sun',
      meals: [1, 1, 1, 1, 1],
    },
  ],
  totals: {
    breakfast: 5,
    snack_1: 6,
    lunch: 6,
    snack_2: 6,
    dinner: 7,
  },
};

interface IBinaryHeatMapProps {
  height: number;
  timePeriod: 'week' | 'month';
}

const BinaryHeatMap: React.FC<IBinaryHeatMapProps> = ({
  height,
  timePeriod,
}) => {
  const theme = useTheme();

  const mealData = timePeriod === 'week' ? MOCK_DATA_WEEK : MOCK_DATA_MONTH;
  const boxWidth =
    mealData.type === 'week' ? COLUMN_WIDTH_MAX : COLUMN_WIDTH_MIN;
  const dataSize =
    mealData.type === 'week' ? CIRCLE_WIDTH_MAX : CIRCLE_WIDTH_MIN;

  const MEAL_TYPE_COLOUR = {
    [EMealType.BREAKFAST]: theme.secondary,
    [EMealType.SNACK_1]: theme.quaternary,
    [EMealType.LUNCH]: theme.primary,
    [EMealType.SNACK_2]: theme.quaternary,
    [EMealType.DINNER]: theme.tertiary,
  };

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
              totalValues={mealData.totalValues}
              boxWidth={boxWidth}
            >
              <SDataTitle className={className}>{title}</SDataTitle>
              {mealData.data.map((data, index) => {
                const colour = MEAL_TYPE_COLOUR[id];
                const hasValue = !!data.meals[mealIindex];
                const isLastValue = mealData.data[index + 1] === undefined;
                const nextValueZero =
                  mealData.data[index + 1]?.meals[mealIindex] === 0;
                const showLine = hasValue && !isLastValue && !nextValueZero;

                return (
                  <SData key={data.id} className={className}>
                    {hasValue && (
                      <SCircleDisplay
                        colour={colour}
                        size={dataSize}
                        title={`total: ${mealData.totals[id]}`}
                      />
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
        <SHAxisContainer totalValues={mealData.totalValues} boxWidth={boxWidth}>
          {mealData.legend.map((key) => (
            <SHAxisKey key={getUniqueId()}>{key}</SHAxisKey>
          ))}
        </SHAxisContainer>
      </SDataContainer>
    </SContainer>
  );
};

export default BinaryHeatMap;
