import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { SpinnerFade } from '@components/ui/loaders';
import { getThemeVarColor } from '@utils/theme-utils';
import { ThemeColor } from '@utils/interfaces';
import { getClassNames } from '@utils/string-utils';

interface ISCommon {
  width?: number;
  background: string;
}
interface ISButton extends ISCommon {
  height?: number;
  borderWidth?: number;
  fontSize?: number;
  color: string;
}

const SContainer = styled.div<ISCommon>`
  position: relative;
  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    border-radius: 8px;
    background: ${({ background }) =>
      `color-mix(in srgb, ${background}, transparent 70%)`};
    transition: background-color 250ms;
  }
`;
const SButton = styled.button<ISButton>`
  position: relative;
  color: ${({ color }) => color};
  background-color: transparent;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  border-color: ${({ background }) => background};
  border-width: ${({ borderWidth }) => borderWidth}px;
  border-style: solid;

  font-size: ${({ fontSize }) => fontSize}px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;

  transition: background-color 250ms;

  &.loading {
    background-color: ${({ background }) => background};
  }
  &.disabled {
    opacity: 0.4;
    transition: background-color 0ms;
    border-color: transparent;
    cursor: default;
  }
  :hover:not(&.disabled) {
    background-color: ${({ background }) => background};
  }
`;
const SInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
`;
const SLoaderContainer = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  justify-content: center;
  align-items: center;

  &.loading {
    opacity: 0.8;
  }
`;
const SChildContainer = styled.div`
  z-index: 1;

  &.loading {
    opacity: 0.6;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  background?: ThemeColor;
  height?: number;
  width?: number;
  borderWidth?: number;
  fontSize?: number;
  loading?: boolean;
  color?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  background,
  height,
  width,
  borderWidth = 2,
  fontSize = 24,
  loading = false,
  color = 'var(--text)',
  onClick,
  isDisabled,
  ...rest
}) => {
  const themeColour = getThemeVarColor(background);
  const classNames = getClassNames({ loading, disabled: isDisabled });

  return (
    <SContainer className={classNames} background={themeColour} width={width}>
      <SButton
        background={themeColour}
        height={height}
        width={width}
        borderWidth={borderWidth}
        {...rest}
        color={color}
        disabled={isDisabled || loading}
        onClick={onClick}
        className={classNames}
        fontSize={fontSize}
      >
        <SInnerContainer>
          {loading && (
            <SLoaderContainer className={classNames}>
              <SpinnerFade size={0} background={background} />
            </SLoaderContainer>
          )}
          <SChildContainer className={classNames}>{children}</SChildContainer>
        </SInnerContainer>
      </SButton>
    </SContainer>
  );
};
