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

const SContainer = styled.div`
  position: relative;
`;
const SButton = styled.button<ISButton>`
  position: relative;
  color: ${({ color }) => color};
  background-color: transparent;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  border-width: ${({ borderWidth }) => borderWidth}px;
  border-style: solid;

  font-size: ${({ fontSize }) => fontSize}px;
  padding: 6px 12px;
  border-radius: 8px;
  transition: 250ms;

  cursor: pointer;
  &.loading {
    cursor: default;
  }

  border-color: var(${({ background }) => background});
  &.inverted {
    border-color: var(--text);
  }

  &.loading:not(&.inverted) {
    background-color: var(${({ background }) => background});
  }

  &.disabled {
    opacity: 0.4;
    transition: background-color 0ms;
    border-color: transparent;
    cursor: default;
  }

  :hover:not(&.disabled):not(&.inverted) {
    background-color: var(${({ background }) => background});
  }
  :hover&.inverted:not(&.disabled) {
    color: var(--bg-secondary);
    background-color: var(--text);

    .background {
      background-color: transparent;
    }
  }
`;
const SButtonBackground = styled.div<ISCommon>`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 8px;
  transition: 250ms;

  background-color: ${({ background }) =>
    `color-mix(in srgb, var(${background}), transparent 70%)`};

  &.inverted {
    background-color: var(--bg-secondary);
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
`;
const SChildContainer = styled.div`
  z-index: 1;

  &.loading:not(&.inverted) {
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
  inverted?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  background,
  height,
  width,
  borderWidth = 1,
  fontSize = 24,
  loading = false,
  color = 'var(--text)',
  onClick,
  isDisabled = false,
  inverted = false,
  ...rest
}) => {
  const themeColour = getThemeVarColor(background);
  const classNames = getClassNames({ loading, disabled: isDisabled, inverted });

  return (
    <SContainer>
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
        <SButtonBackground
          className={`${classNames} background`}
          width={width}
          background={themeColour}
        />
        <SInnerContainer>
          {loading && !inverted && (
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
