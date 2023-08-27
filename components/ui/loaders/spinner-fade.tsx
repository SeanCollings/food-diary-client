import { ThemeColor } from '@utils/interfaces';
import { getThemeVarColor } from '@utils/theme-utils';
import { FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  size: number;
  color: string;
  delay: number;
  background: string;
}

const SContainer = styled.div<ISContainer>`
  &.loader {
    aspect-ratio: 1 / 1;
    height: 100%;
    font-size: 10px;
    text-indent: -9999em;
    max-width: ${({ size }) => (size ? `${size}px` : '100%')};
    max-height: ${({ size }) => (size ? `${size}px` : '100%')};
    border-radius: 50%;
    background: ${({ color }) => color};

    background: -moz-linear-gradient(
      left,
      ${({ color }) => color} 10%,
      ${({ background }) => background} 42%
    );
    background: -webkit-linear-gradient(
      left,
      ${({ color }) => color} 10%,
      ${({ background }) => background} 42%
    );
    background: -o-linear-gradient(
      left,
      ${({ color }) => color} 10%,
      ${({ background }) => background} 42%
    );
    background: -ms-linear-gradient(
      left,
      ${({ color }) => color} 10%,
      ${({ background }) => background} 42%
    );
    background: linear-gradient(
      to right,
      ${({ color }) => color} 10%,
      ${({ background }) => background} 42%
    );
    position: relative;
    -webkit-animation: load3 ${({ delay }) => delay}s infinite linear;
    animation: load3 ${({ delay }) => delay}s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  &.loader:before {
    width: 50%;
    height: 50%;
    background: ${({ color }) => color};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &.loader:after {
    background: ${({ background }) => background};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

interface SpinnerFadeProps {
  /** Size of the spinner. A size of `0` will set height of container */
  size?: number;
  /** The animation delay. Default `1.4s` */
  delay?: number;
  color?: string;
  background?: ThemeColor;
}

export const SpinnerFade: FC<SpinnerFadeProps> = ({
  size = 45,
  color = 'var(--text)',
  delay = 1.4,
  background = 'primary',
}) => {
  return (
    <SContainer
      className="loader"
      size={size}
      color={color}
      delay={delay}
      background={getThemeVarColor(background)}
    ></SContainer>
  );
};
