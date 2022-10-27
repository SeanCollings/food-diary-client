import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IRequestExcerciseTendData } from '@hooks/request/trends/use-request-wellness-trends';
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
}
interface ISRotateLine {
  length: number;
  position: number;
  rotate: number;
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
  background: var(--th-primary);
  top: ${({ position }) => position}%;

  :hover {
    scale: 1.2;
  }
`;
const SRotateLine = styled.div<ISRotateLine>`
  width: 2px;
  background: var(--th-primary);
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

interface ILineGraphProps {
  height: number;
  timePeriod: TTimePeriod;
  data: IRequestExcerciseTendData;
}

const percentage = (value: number, maxValue: number) =>
  +((value / maxValue) * 100).toFixed(2);

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

const LineGraph: React.FC<ILineGraphProps> = ({ height, data }) => {
  const excerciseData = data.week;

  const graphHeight = height - LEGEND_HEIGHT;
  const ptpLength = COLUMN_WIDTH + COLUMN_GAP;
  const maxBound = getMaxBound(excerciseData?.highestValue ?? 0);
  const maxValue = Math.max(
    Math.ceil((excerciseData?.highestValue ?? 0) / maxBound) * maxBound,
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
            {excerciseData?.data.map((value, index) => {
              const isLastValue = excerciseData?.data[index + 1] === undefined;

              const currentPosition = 100 - percentage(value, maxValue);
              const percentageCurrentHeight =
                percentage(currentPosition, 100) / 100;
              const actualCurrentHeight = graphHeight * percentageCurrentHeight;

              const nextPosition =
                100 - percentage(excerciseData?.data[index + 1] ?? 0, maxValue);
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
                  />
                  {!isLastValue && (
                    <SRotateLine
                      length={lineLength}
                      position={currentPosition}
                      rotate={lineRotate}
                    />
                  )}
                </SPointContainer>
              );
            })}
          </SLineContainer>
          <SHAxisContainer>
            {excerciseData?.legend.map((key) => (
              <SHAxisKey key={getUniqueId()}>{key}</SHAxisKey>
            ))}
          </SHAxisContainer>
        </SDataContainer>
      </SInnerContainer>
    </SContainer>
  );
};

export default LineGraph;
