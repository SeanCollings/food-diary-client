import { FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  height: number;
  size: number;
  spacing: number;
  top: number;
}

const SContainer = styled.div<ISContainer>`
  display: flex;
  top: ${({ top }) => top}px;

  &.lds-ellipsis {
    position: relative;
    width: 80px;
    height: ${({ height }) => height}px;
  }
  &.lds-ellipsis div {
    position: absolute;
    display: flex;
    align-self: center;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    background: var(--text);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  &.lds-ellipsis div:nth-child(1) {
    left: ${({ spacing }) => spacing}px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  &.lds-ellipsis div:nth-child(2) {
    left: ${({ spacing }) => spacing}px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  &.lds-ellipsis div:nth-child(3) {
    left: ${({ spacing }) => spacing * 4}px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  &.lds-ellipsis div:nth-child(4) {
    left: ${({ spacing }) => spacing * 7}px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(${({ spacing }) => spacing * 3}px, 0);
    }
  }
`;

interface EllipsisProps {
  height?: number;
  size?: number;
  spacing?: number;
  top?: number;
}

export const Ellipsis: FC<EllipsisProps> = ({
  height = 30,
  size = 12,
  spacing = 8,
  top = 0,
}) => {
  return (
    <SContainer
      className="lds-ellipsis"
      height={height}
      size={size}
      spacing={spacing}
      top={top}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SContainer>
  );
};
