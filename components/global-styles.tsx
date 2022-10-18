import { createGlobalStyle } from 'styled-components';
import { DARK_THEMES, LIGHT_THEMES } from '@utils/constants/theme.constants';

const GlobalStyle = createGlobalStyle`
  [data-theme="light_1"] {
    ${LIGHT_THEMES.light_1.toThemeString()}
  }
  [data-theme="light_2"] {
    ${LIGHT_THEMES.light_2.toThemeString()}
  }
  [data-theme="light_3"] {
    ${LIGHT_THEMES.light_3.toThemeString()}
  }
  [data-theme="light_4"] {
    ${LIGHT_THEMES.light_4.toThemeString()}
  }
  [data-theme="light_5"] {
    ${LIGHT_THEMES.light_5.toThemeString()}
  }

  [data-theme="dark_1"] {
    ${DARK_THEMES.dark_1.toThemeString()}
  }
  [data-theme="dark_2"] {
    ${DARK_THEMES.dark_2.toThemeString()}
  }
  [data-theme="dark_3"] {
    ${DARK_THEMES.dark_3.toThemeString()}
  }
  [data-theme="dark_4"] {
    ${DARK_THEMES.dark_4.toThemeString()}
  }
  [data-theme="dark_5"] {
    ${DARK_THEMES.dark_5.toThemeString()}
  }

  html,
  body {
    color: var(--text);
    background-color: var(--bg-primary);
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  button {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  input {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  textarea {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
