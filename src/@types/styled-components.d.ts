import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
      primary: string;
      secondary: string;
    };
  }
}
