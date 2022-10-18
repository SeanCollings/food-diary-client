import { useOnClickOutsideElementsArray } from '@hooks/use-onclick-outside-element';
import { useTheme } from '@hooks/use-theme';
import { COLOURS } from '@utils/constants';
import { DARK_THEMES, LIGHT_THEMES } from '@utils/constants/theme.constants';
import {
  TApplicationTheme,
  TDarkThemeIds,
  TLightThemeIds,
  TThemeIds,
} from '@utils/constants/theme.interfaces';
import { useState, useRef } from 'react';
import styled from 'styled-components';

interface ISTheme {
  background: string;
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
  background-color: var(--bg-tertiary);

  &.light {
    box-shadow: 0px 8px 20px -8px ${COLOURS.black};
  }
  &.closed {
    height: 0px;
    max-height: 0;
  }
  &.open {
    animation: open-themes 0.2s ease-out forwards;
  }

  @keyframes open-themes {
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
    background-color: var(--bg-secondary);
  }
  &.isSelected {
    cursor: default;
    opacity: 0.8;
    ::before {
      content: '-';
    }
  }
  :hover:not(.isSelected) {
    background-color: var(--bg-primary);
  }
`;

const ThemeDisplay: React.FC = () => {
  const { darkMode, setTheme, theme } = useTheme();
  const currentThemeRef = useRef<HTMLDivElement>(null);
  const themePickerRef = useRef<HTMLDivElement>(null);
  const [themeOpened, setThemeOpened] = useState(false);

  useOnClickOutsideElementsArray([currentThemeRef, themePickerRef], () =>
    setThemeOpened(false)
  );

  const currentTheme: TApplicationTheme =
    darkMode && theme
      ? DARK_THEMES[theme as TDarkThemeIds]
      : LIGHT_THEMES[theme as TLightThemeIds];
  const currentMode = darkMode ? DARK_THEMES : LIGHT_THEMES;

  const openThemeSelection = () => {
    setThemeOpened((curr) => !curr);
  };
  const onClickHandler = (id: TThemeIds) => {
    if (theme === id) {
      return;
    }

    setTheme(id);
    setThemeOpened(false);
  };

  return (
    <>
      <SContainer
        ref={currentThemeRef}
        title={currentTheme.name}
        onClick={openThemeSelection}
      >
        <SColoursContainer>
          <STheme background={currentTheme.themes['--th-secondary']} />
          <STheme background={currentTheme.themes['--th-primary']} />
          <STheme background={currentTheme.themes['--th-tertiary']} />
        </SColoursContainer>
      </SContainer>
      <SThemePickerContainer
        ref={themePickerRef}
        className={`${themeOpened ? 'open' : 'closed'} ${
          darkMode ? 'dark' : 'light'
        }`}
      >
        <SThemePickerWrapper>
          {Object.values(currentMode).map((themeChoice) => (
            <SThemePickerRow
              key={themeChoice.id}
              className={`${theme === themeChoice.id ? 'isSelected' : ''}`}
              onClick={() => onClickHandler(themeChoice.id)}
            >
              {themeChoice.name}
              <SColoursContainer>
                <STheme background={themeChoice.themes['--th-secondary']} />
                <STheme background={themeChoice.themes['--th-primary']} />
                <STheme background={themeChoice.themes['--th-tertiary']} />
              </SColoursContainer>
            </SThemePickerRow>
          ))}
        </SThemePickerWrapper>
      </SThemePickerContainer>
    </>
  );
};

export default ThemeDisplay;
