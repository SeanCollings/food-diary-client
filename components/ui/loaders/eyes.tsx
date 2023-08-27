import { COLOURS } from '@utils/app.constants';
import { FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  size: number;
}

const SContainer = styled.span<ISContainer>`
  display: flex;
  align-items: center;
  height: ${({ size }) => size}px;

  &.loader {
    position: relative;
    width: ${({ size }) => size * 2.3}px;
    display: flex;
    justify-content: space-between;
  }
  &.loader::after,
  &.loader::before {
    content: '';
    display: inline-block;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background-color: ${COLOURS.white};
    background-image: radial-gradient(
      circle ${({ size }) => size / 3.5}px,
      ${COLOURS.black} 100%,
      transparent 0
    );
    background-repeat: no-repeat;
    border-radius: 50%;
    animation: eyeMove 10s infinite, blink 10s infinite;
    border: 1px solid var(--th-primary);
  }
  @keyframes eyeMove {
    0%,
    10% {
      background-position: 0px 0px;
    }
    13%,
    40% {
      background-position: -${({ size }) => size / 3.2}px 0px;
    }
    43%,
    70% {
      background-position: ${({ size }) => size / 3.2}px 0px;
    }
    73%,
    90% {
      background-position: 0px ${({ size }) => size / 3.2}px;
    }
    93%,
    100% {
      background-position: 0px 0px;
    }
  }
  @keyframes blink {
    0%,
    10%,
    12%,
    20%,
    22%,
    40%,
    42%,
    60%,
    62%,
    70%,
    72%,
    90%,
    92%,
    98%,
    100% {
      height: ${({ size }) => size}px;
    }
    11%,
    21%,
    41%,
    61%,
    71%,
    91%,
    99% {
      height: ${({ size }) => size / 4}px;
    }
  }
`;

interface EyesProps {
  size?: number;
}

export const Eyes: FC<EyesProps> = ({ size = 48 }) => {
  return <SContainer className="loader" size={size}></SContainer>;
};
