import { COLOURS } from '@utils/app.constants';
import { FC } from 'react';
import styled from 'styled-components';

interface ISVariables {
  delay: number;
}
interface ISContainer {
  height: number;
  thickness: number;
  opacity: number;
  color: string;
}

const SVariables = styled.div<ISVariables>`
  --delay: ${({ delay }) => delay};
`;

const SContainer = styled.div<ISContainer>`
  opacity: ${({ opacity }) => opacity};
  border-radius: 50%;

  &.lds-ring {
    display: inline-block;
    position: relative;
    width: ${({ height }) => height}px;
    height: ${({ height }) => height}px;
  }
  &.lds-ring div {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border: ${({ thickness }) => thickness}px solid var(--text);
    border-radius: 50%;
    animation: lds-ring calc(1.2s / var(--delay, 1))
      cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color }) => color} transparent transparent transparent;
  }
  &.lds-ring div:nth-child(1) {
    animation-delay: calc(-0.45s / var(--delay, 1));
  }
  &.lds-ring div:nth-child(2) {
    animation-delay: calc(-0.3s / var(--delay, 1));
  }
  &.lds-ring div:nth-child(3) {
    animation-delay: calc(-0.15s / var(--delay, 1));
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface SpinnerLineProps {
  height?: number;
  thickness?: number;
  delay?: number;
  opacity?: number;
  color?: string;
}

export const SpinnerLine: FC<SpinnerLineProps> = ({
  height = 60,
  thickness = 6,
  delay = 1,
  opacity = 1,
  color = COLOURS.white,
}) => {
  return (
    <SVariables delay={delay}>
      <SContainer
        className="lds-ring"
        height={height}
        thickness={thickness}
        opacity={opacity}
        color={color}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SContainer>
    </SVariables>
  );
};
