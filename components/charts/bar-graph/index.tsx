import { wellnessTrendMockdata } from '@client/mock';
import { COLOURS, OPACITY_40 } from '@utils/constants';
import { EWellnessTypes } from '@utils/interfaces';
import { getUniqueId } from '@utils/unique-id';
import { FC } from 'react';
import styled from 'styled-components';

const COLUMN_WIDTH = 95;
const LEGEND_HEIGHT = 30;
const BORDER_RADIUS = 4;
const BAR_GROUP_GAP = 20;
const BAR_GAP = 2;
const TOTAL_LINES = 5;
const MIN_TICK_VALUE = 10;

interface ISDataContainer {
  height: number;
}
interface ISBar {
  borderRadius: number;
  barHeight: number;
  backgroundColour: string;
}
interface ISTick {
  topPosition: number;
}
interface ISLegendContainer {
  show: boolean;
}
interface ISLegendCircle {
  colour: string;
}

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 0;
  width: fit-content;
`;
const SInnerContainer = styled.div`
  display: flex;
  gap: 4px;
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
const SBarGroupContainer = styled.div`
  display: flex;
  gap: ${BAR_GROUP_GAP}px;
  height: calc(100% - ${LEGEND_HEIGHT}px);
`;
const SBarGroup = styled.div`
  width: ${COLUMN_WIDTH}px;
  display: flex;
  align-items: flex-end;
  gap: ${BAR_GAP}px;
  justify-content: space-between;
  z-index: 1;
`;
const SBar = styled.div<ISBar>`
  width: 100%;
  border-top-left-radius: ${({ borderRadius }) => borderRadius}px;
  border-top-right-radius: ${({ borderRadius }) => borderRadius}px;
  height: ${({ barHeight }) => barHeight}%;
  background: var(--th-${({ backgroundColour }) => backgroundColour});
`;
const SHAxisContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${BAR_GROUP_GAP}px;
  font-size: 12px;
  height: ${LEGEND_HEIGHT}px;
  border-top: 1px solid ${COLOURS.gray}${OPACITY_40};
`;
const SHAxisKey = styled.div`
  text-align: center;
  width: ${COLUMN_WIDTH}px;
`;
const SLegendContainer = styled.div<ISLegendContainer>`
  gap: 10px;
  font-size: 14px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
`;
const SLegend = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const SLegendCircle = styled.div<ISLegendCircle>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--th-${({ colour }) => colour});
`;

interface IBarGraphProps {
  height: number;
}

const percentage = (value: number, maxValue: number) =>
  +((value / maxValue) * 100).toFixed(2);

interface IBarGraphLegendProps {
  show: boolean;
}

export const BarGraphLegend: FC<IBarGraphLegendProps> = ({ show }) => {
  const BEVERAGE_COLOUR: { [key in EWellnessTypes]: string } = {
    [EWellnessTypes.WATER]: 'primary',
    [EWellnessTypes.TEA_COFFEE]: 'quaternary',
    [EWellnessTypes.ALCOHOL]: 'secondary',
  };

  return (
    <SLegendContainer show={show}>
      <SLegend>
        <SLegendCircle colour={BEVERAGE_COLOUR['water']} />
        Water
      </SLegend>
      <SLegend>
        <SLegendCircle colour={BEVERAGE_COLOUR['tea_coffee']} />
        Tea/Coffee
      </SLegend>
      <SLegend>
        <SLegendCircle colour={BEVERAGE_COLOUR['alcohol']} />
        Alcohol
      </SLegend>
    </SLegendContainer>
  );
};

const BarGraph: React.FC<IBarGraphProps> = ({ height }) => {
  const maxValue = Math.max(
    Math.ceil(wellnessTrendMockdata.highestValue / MIN_TICK_VALUE) *
      MIN_TICK_VALUE,
    MIN_TICK_VALUE
  );

  const BEVERAGE_COLOUR: { [key in EWellnessTypes]: string } = {
    [EWellnessTypes.WATER]: 'primary',
    [EWellnessTypes.TEA_COFFEE]: 'quaternary',
    [EWellnessTypes.ALCOHOL]: 'secondary',
  };

  return (
    <SContainer>
      <SInnerContainer>
        <SVAxisContainer>
          {Array(TOTAL_LINES + 1)
            .fill('')
            .map((_, index) => (
              <SVAxisKey key={getUniqueId()}>
                {maxValue - index * (maxValue / TOTAL_LINES)}
              </SVAxisKey>
            ))}
        </SVAxisContainer>
        <SDataContainer height={height}>
          <STickContainer>
            {Array(TOTAL_LINES)
              .fill('')
              .map((_, index) => (
                <STick
                  key={getUniqueId()}
                  topPosition={(index * 100) / TOTAL_LINES}
                />
              ))}
          </STickContainer>
          <SBarGroupContainer>
            {wellnessTrendMockdata.data.map(
              ({ water, tea_coffee, alcohol }) => {
                return (
                  <SBarGroup key={getUniqueId()}>
                    <SBar
                      className="water"
                      barHeight={water ? percentage(water, maxValue) : 1}
                      backgroundColour={BEVERAGE_COLOUR['water']}
                      id={EWellnessTypes.WATER}
                      borderRadius={BORDER_RADIUS}
                      title={`water (${water})`}
                    />
                    <SBar
                      className="tea_coffee"
                      barHeight={
                        tea_coffee ? percentage(tea_coffee, maxValue) : 1
                      }
                      backgroundColour={BEVERAGE_COLOUR['tea_coffee']}
                      id={EWellnessTypes.TEA_COFFEE}
                      borderRadius={BORDER_RADIUS}
                      title={`tea/coffee (${tea_coffee})`}
                    />
                    <SBar
                      className="alcohol"
                      barHeight={alcohol ? percentage(alcohol, maxValue) : 1}
                      backgroundColour={BEVERAGE_COLOUR['alcohol']}
                      id={EWellnessTypes.ALCOHOL}
                      borderRadius={BORDER_RADIUS}
                      title={`alcohol (${alcohol})`}
                    />
                  </SBarGroup>
                );
              }
            )}{' '}
          </SBarGroupContainer>
          <SHAxisContainer>
            {wellnessTrendMockdata.legend.map((key) => (
              <SHAxisKey key={getUniqueId()}>{key}</SHAxisKey>
            ))}
          </SHAxisContainer>
        </SDataContainer>
      </SInnerContainer>
    </SContainer>
  );
};

export default BarGraph;
