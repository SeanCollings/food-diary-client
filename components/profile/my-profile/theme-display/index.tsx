import {
  ThemeBackgroundPrimary,
  ThemeBackgroundSecondary,
  ThemeBackgroundTertiary,
} from '@components/ui/style-themed';
import { useOnClickOutsideElementsArray } from '@hooks/use-onclick-outside-element';
import { useTheme } from '@hooks/use-theme';
import { useUserContext } from '@store/user-context';
import { COLOURS } from '@utils/constants';
import {
  EThemeDark,
  EThemeLight,
  THEME_DARK,
  THEME_LIGHT,
} from '@utils/constants/theme.constants';
import { useState, useRef } from 'react';
import styled from 'styled-components';

interface ISTheme {
  background: string;
  border?: string;
}

const SContainer = styled.div`
  height: 30px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding-right: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
const SColoursContainer = styled.div`
  display: flex;
  gap: 6px;
  height: 26px;
`;
const STheme = styled.div<ISTheme>`
  width: 26px;
  background: ${({ background }) => background};
`;
const SThemePickerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 260px;
  right: -6px;
  top: 5px;
  z-index: 1;
  border-radius: 4px;
  ${ThemeBackgroundTertiary};

  &.light {
    box-shadow: 0px 8px 20px -8px ${COLOURS.black};
  }
  &.closed {
    height: 0px;
    max-height: 0;
  }
  &.open {
    animation: open 0.2s ease-out forwards;
  }

  @keyframes open {
    from {
      max-height: 0px;
    }
    to {
      max-height: 300px;
    }
  }
`;
const SThemePickerWrapper = styled.div`
  padding: 4px;
`;
const SThemePickerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 4px;
  cursor: pointer;

  :not(.isSelected) {
    ${ThemeBackgroundSecondary}
  }
  &.isSelected {
    cursor: default;
    opacity: 0.8;
    ::before {
      content: '-';
    }
  }
  :hover:not(.isSelected) {
    ${ThemeBackgroundPrimary}
  }
`;

const ThemeDisplay: React.FC = () => {
  const theme = useTheme();
  const currentThemeRef = useRef<HTMLDivElement>(null);
  const themePickerRef = useRef<HTMLDivElement>(null);
  const {
    user: { darkMode },
    updateTheme,
  } = useUserContext();
  const [themeOpened, setThemeOpened] = useState(false);
  useOnClickOutsideElementsArray([currentThemeRef, themePickerRef], () =>
    setThemeOpened(false)
  );

  const currentTheme = darkMode ? THEME_DARK : THEME_LIGHT;

  const openThemeSelection = () => {
    setThemeOpened((curr) => !curr);
  };
  const onClickHandler = (name: EThemeDark | EThemeLight) => {
    if (name === theme.name) {
      return;
    }

    const newTheme = darkMode
      ? { dark: name as EThemeDark }
      : { light: name as EThemeLight };

    updateTheme(newTheme);
    setThemeOpened(false);
  };

  return (
    <>
      <SContainer
        ref={currentThemeRef}
        title={theme.name}
        onClick={openThemeSelection}
      >
        <SColoursContainer>
          <STheme
            background={theme.secondary}
            border={theme.backgroundSecondary}
          />
          <STheme
            background={theme.primary}
            border={theme.backgroundSecondary}
          />
          <STheme
            background={theme.tertiary}
            border={theme.backgroundSecondary}
          />
        </SColoursContainer>
      </SContainer>
      <SThemePickerContainer
        ref={themePickerRef}
        className={`${themeOpened ? 'open' : 'closed'} ${
          darkMode ? 'dark' : 'light'
        }`}
      >
        <SThemePickerWrapper>
          {Object.values(currentTheme).map((themeChoice) => (
            <SThemePickerRow
              key={themeChoice.name}
              className={`${
                themeChoice.name === theme.name ? 'isSelected' : ''
              }`}
              onClick={() => onClickHandler(themeChoice.name)}
            >
              {themeChoice.name}
              <SColoursContainer>
                <STheme background={themeChoice.secondary} />
                <STheme background={themeChoice.primary} />
                <STheme background={themeChoice.tertiary} />
              </SColoursContainer>
            </SThemePickerRow>
          ))}
        </SThemePickerWrapper>
      </SThemePickerContainer>
    </>
  );
};

export default ThemeDisplay;
