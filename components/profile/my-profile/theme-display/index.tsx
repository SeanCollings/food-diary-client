import { useUserContext } from '@store/user-context';
import {
  EThemeDark,
  EThemeLight,
  THEME_DARK,
  THEME_LIGHT,
} from '@utils/constants/theme.constants';
import styled from 'styled-components';

interface ISTheme {
  background: string;
  selected: boolean;
}

const SContainer = styled.div`
  height: 30px;
  width: fit-content;
  display: flex;
`;
const STheme = styled.div<ISTheme>`
  width: 30px;
  height: 100%;
  cursor: pointer;
  background: ${({ background }) => background};
  scale: 0.9;
  transition: 0.1s;

  ${({ selected }) => selected && `border-radius: 50%`};

  :hover {
    scale: 1;
  }
`;

const ThemeDisplay: React.FC = () => {
  const {
    user: { darkMode, theme },
  } = useUserContext();

  const currentTheme = darkMode ? THEME_DARK : THEME_LIGHT;
  const selectedTheme = darkMode ? theme.dark : theme.light;

  const onClickHandler = (name: EThemeDark | EThemeLight) => {
    console.log('name', name);
  };

  return (
    <SContainer>
      {Object.values(currentTheme).map((theme) => (
        <STheme
          key={theme.name}
          selected={selectedTheme === theme.name}
          background={theme.primary}
          title={theme.name}
          onClick={() => onClickHandler(theme.name)}
        />
      ))}
    </SContainer>
  );
};

export default ThemeDisplay;
