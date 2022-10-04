import { useTheme } from '@hooks/use-theme';
import { COLOURS, OPACITY_40 } from '@utils/constants';
import { formatMinutesToHoursMinutes } from '@utils/time-utils';
import { getUniqueId } from '@utils/unique-id';
import styled from 'styled-components';

const LEGEND_HEIGHT = 30;
const COLUMN_WIDTH = 100;
const COLUMN_GAP = 10;
const TOTAL_LINES = 2;
const CIRCLE_WIDTH = 10;
const MIN_TICK_VALUE = 60;
const GREATER_MIN_TICK_VALUE = 120;
const HOUR = 60;

interface ISDataContainer {
  height: number;
}
interface ISTick {
  topPosition: number;
}
interface ISPoint {
  position: number;
  colour: string;
}
interface ISRotateLine {
  length: number;
  position: number;
  rotate: number;
  colour: string;
}

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 0;
  width: fit-content;
`;
const SInnerContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const SVAxisContainer = styled.div`
  height: calc(100% - ${LEGEND_HEIGHT - 20}px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: -10px;
`;
const SVAxisKey = styled.div`
  font-size: 14px;
`;

const SDataContainer = styled.div<ISDataContainer>`
  max-height: 320px;
  height: ${({ height }) => height}px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
`;
const STickContainer = styled.div`
  height: calc(100% - ${LEGEND_HEIGHT}px);
  width: 100%;
  position: absolute;
`;
const STick = styled.div<ISTick>`
  width: 100%;
  height: 1px;
  position: absolute;
  background: ${COLOURS.gray}${OPACITY_40};
  top: ${({ topPosition }) => topPosition}%;
`;
const SLineContainer = styled.div`
  display: flex;
  gap: ${COLUMN_GAP}px;
  height: calc(100% - ${LEGEND_HEIGHT}px);
`;
const SPointContainer = styled.div`
  position: relative;
  width: ${COLUMN_WIDTH}px;
  display: flex;
  justify-content: center;
  z-index: 1;
`;
const SPoint = styled.div<ISPoint>`
  position: relative;
  width: ${CIRCLE_WIDTH}px;
  height: ${CIRCLE_WIDTH}px;
  border-radius: ${CIRCLE_WIDTH}px;
  margin-top: -4px;
  z-index: 2;
  background: ${({ colour }) => colour};
  top: ${({ position }) => position}%;
`;
const SRotateLine = styled.div<ISRotateLine>`
  width: 2px;
  background: ${({ colour }) => colour};
  position: absolute;
  transform-origin: top;
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  height: ${({ length }) => length}px;
  top: ${({ position }) => position}%;
`;
const SHAxisContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${COLUMN_GAP}px;
  font-size: 12px;
  height: ${LEGEND_HEIGHT}px;
  border-top: 1px solid ${COLOURS.gray}${OPACITY_40};
`;
const SHAxisKey = styled.div`
  text-align: center;
  width: ${COLUMN_WIDTH}px;
`;

interface IExcerciseData {
  type: 'week' | 'month';
  highestValue: number;
  legend: string[];
  data: number[];
}

const MOCK_EXERCISE_DATA: IExcerciseData = {
  type: 'week',
  highestValue: 60,
  legend: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  data: [60, 0, 42, 49, 0, 0, 30],
};

interface ILineGraphProps {
  height: number;
}

const percentage = (value: number, maxValue: number) =>
  +((value / maxValue) * 100).toFixed(2);

const getPointLine = () => {};

const getMaxBound = (highestValue: number) => {
  if (highestValue <= MIN_TICK_VALUE) {
    return MIN_TICK_VALUE;
  } else if (
    highestValue > MIN_TICK_VALUE &&
    highestValue <= GREATER_MIN_TICK_VALUE
  ) {
    return GREATER_MIN_TICK_VALUE;
  }

  const isOnHour = (highestValue / HOUR) % 1 === 0;

  if (isOnHour) {
    return highestValue;
  }

  return Math.ceil(highestValue / HOUR) * HOUR;
};

const LineGraph: React.FC<ILineGraphProps> = ({ height }) => {
  const theme = useTheme();

  const graphHeight = height - LEGEND_HEIGHT;
  const ptpLength = COLUMN_WIDTH + COLUMN_GAP;
  const maxBound = getMaxBound(MOCK_EXERCISE_DATA.highestValue);
  const maxValue = Math.max(
    Math.ceil(MOCK_EXERCISE_DATA.highestValue / maxBound) * maxBound,
    maxBound
  );

  return (
    <SContainer>
      <SInnerContainer>
        <SVAxisContainer>
          {Array(TOTAL_LINES + 1)
            .fill('')
            .map((_, index) => (
              <SVAxisKey key={getUniqueId()}>
                {formatMinutesToHoursMinutes(
                  maxValue - index * (maxValue / TOTAL_LINES)
                )}
              </SVAxisKey>
            ))}
        </SVAxisContainer>
        <SDataContainer height={height}>
          <STickContainer>
            {Array(TOTAL_LINES + 2)
              .fill('')
              .map((_, index) => (
                <STick
                  key={getUniqueId()}
                  topPosition={(index * 100) / (TOTAL_LINES + 2)}
                />
              ))}
          </STickContainer>
          <SLineContainer>
            {MOCK_EXERCISE_DATA.data.map((value, index) => {
              const isLastValue =
                MOCK_EXERCISE_DATA.data[index + 1] === undefined;

              const currentPosition = 100 - percentage(value, maxValue);
              const percentageCurrentHeight =
                percentage(currentPosition, 100) / 100;
              const actualCurrentHeight = graphHeight * percentageCurrentHeight;

              const nextPosition =
                100 -
                percentage(MOCK_EXERCISE_DATA.data[index + 1] ?? 0, maxValue);
              const percentageNextHeight = percentage(nextPosition, 100) / 100;
              const actualNextHeight = graphHeight * percentageNextHeight;
              const differenceHeight = Math.abs(
                actualCurrentHeight - actualNextHeight
              );
              const direction = currentPosition > nextPosition ? 1 : -1;

              const lineLength = Math.sqrt(
                Math.pow(differenceHeight, 2) + Math.pow(ptpLength, 2)
              );

              const rads = Math.asin(differenceHeight / lineLength);
              const lineRotate = -(90 + direction * (rads * (180 / Math.PI)));

              return (
                <SPointContainer key={getUniqueId()}>
                  <SPoint
                    position={currentPosition}
                    title={`${formatMinutesToHoursMinutes(value)}`}
                    colour={theme.primary}
                  />
                  {!isLastValue && (
                    <SRotateLine
                      length={lineLength}
                      position={currentPosition}
                      rotate={lineRotate}
                      colour={theme.primary}
                    />
                  )}
                </SPointContainer>
              );
            })}
          </SLineContainer>
          <SHAxisContainer>
            {MOCK_EXERCISE_DATA.legend.map((key) => (
              <SHAxisKey key={getUniqueId()}>{key}</SHAxisKey>
            ))}
          </SHAxisContainer>
        </SDataContainer>
      </SInnerContainer>
    </SContainer>
  );
};

export default LineGraph;
