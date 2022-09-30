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
const DATA_WIDTH_MAX = 100;
const DATA_WIDTH_MIN = 24;
const CIRCLE_WIDTH_MAX = 30;
const CIRCLE_WIDTH_MIN = 14;

interface ISDataContainer {
  height: number;
}
interface ISMealDetailContainer {
  boxWidth: number;
  totalValues: number;
}
interface ISLegendContainer {
  boxWidth: number;
  totalValues: number;
}
interface ISCircleDisplay {
  colour: string;
  size: number;
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
`;

const SMealDetailContainer = styled.div<ISMealDetailContainer>`
  display: grid;
  grid-template-columns: ${({ totalValues, boxWidth }) =>
    `${TITLE_WIDTH}px repeat(${totalValues}, ${boxWidth}px`});

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
`;

const SLegendContainer = styled.div<ISLegendContainer>`
  ::before {
    content: '';
  }

  display: grid;
  font-size: 12px;
  grid-template-columns: ${({ totalValues, boxWidth }) =>
    `${TITLE_WIDTH}px repeat(${totalValues}, ${boxWidth}px`});

  span:not(:last-child) {
    border-right: 1px solid ${COLOURS.gray}${OPACITY_40};
  }
`;
const SLegendKey = styled(SDataItem)``;

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
};
const MEAL_TYPE_COLOUR = {
  [EMealType.BREAKFAST]: APP_THEME_DEFAULT.secondary,
  [EMealType.SNACK_1]: APP_THEME_DEFAULT.quaternary,
  [EMealType.LUNCH]: APP_THEME_DEFAULT.primary,
  [EMealType.SNACK_2]: APP_THEME_DEFAULT.quaternary,
  [EMealType.DINNER]: APP_THEME_DEFAULT.tertiary,
};

interface IBinaryHeatMapProps {
  height: number;
  timePeriod: 'week' | 'month';
}

const BinaryHeatMap: React.FC<IBinaryHeatMapProps> = ({
  height,
  timePeriod,
}) => {
  const mealData = timePeriod === 'week' ? MOCK_DATA_WEEK : MOCK_DATA_MONTH;
  const boxWidth = mealData.type === 'week' ? DATA_WIDTH_MAX : DATA_WIDTH_MIN;
  const dataSize =
    mealData.type === 'week' ? CIRCLE_WIDTH_MAX : CIRCLE_WIDTH_MIN;

  return (
    <SContainer>
      <SDataContainer height={height}>
        {ALL_MEAL_CARDS.map(({ id, title }, index) => {
          const className = lastItem(ALL_MEAL_CARDS, index) ? 'last-item' : '';

          return (
            <SMealDetailContainer
              key={id}
              totalValues={mealData.totalValues}
              boxWidth={boxWidth}
            >
              <SDataTitle className={className}>{title}</SDataTitle>
              {mealData.data.map((data) => (
                <SData key={data.id} className={className}>
                  {!!data.meals[index] && (
                    <SCircleDisplay
                      colour={MEAL_TYPE_COLOUR[id]}
                      size={dataSize}
                    />
                  )}
                  <div />
                </SData>
              ))}
            </SMealDetailContainer>
          );
        })}
        <SLegendContainer
          totalValues={mealData.totalValues}
          boxWidth={boxWidth}
        >
          {mealData.legend.map((key) => (
            <SLegendKey key={getUniqueId()}>{key}</SLegendKey>
          ))}
        </SLegendContainer>
      </SDataContainer>
    </SContainer>
  );
};

export default BinaryHeatMap;
