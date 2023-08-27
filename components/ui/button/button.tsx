import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { SpinnerFade } from '@components/ui/loaders';
import { getThemeVarColor } from '@utils/theme-utils';
import { ThemeColor } from '@utils/interfaces';

interface ISButton {
  background: string;
  width?: number;
  height?: number;
  borderWidth?: number;
  fontSize?: number;
  color: string;
}

const SContainer = styled.div<any>`
  position: relative;
  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    background: ${({ background }) =>
      `color-mix(in srgb, ${background}, transparent 70%)`};
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
  :hover {
    background-color: ${({ background }) => background};
  }
  :active:not(&.loading) {
    opacity: 0.8;
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
  ...rest
}) => {
  const themeColour = getThemeVarColor(background);
  const loadingClass = loading ? 'loading' : '';

  return (
    <SContainer background={themeColour} className={loadingClass}>
      <SButton
        background={themeColour}
        height={height}
        width={width}
        borderWidth={borderWidth}
        {...rest}
        color={color}
        disabled={loading}
        onClick={onClick}
        className={loadingClass}
        fontSize={fontSize}
      >
        <SInnerContainer>
          {loading && (
            <SLoaderContainer className={loadingClass}>
              <SpinnerFade size={0} background={background} />
            </SLoaderContainer>
          )}
          <SChildContainer className={loadingClass}>{children}</SChildContainer>
        </SInnerContainer>
      </SButton>
    </SContainer>
  );
};
