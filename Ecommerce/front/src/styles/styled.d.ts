import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      primary: string;
      text: string;
      textSecondary: string;
      border: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}