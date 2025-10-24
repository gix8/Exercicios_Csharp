import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  button {
    cursor: pointer;
    border: 0;
    background: ${theme.colors.primary};
    color: ${theme.colors.text};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    border-radius: 4px;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;