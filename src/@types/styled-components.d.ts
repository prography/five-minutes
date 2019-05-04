import 'styled-components';

declare module 'styled-components' {
  interface Palette {
    light?: string;
    main: string;
    dark: string;
    contrastText: string;
  }
  export interface DefaultTheme {
    palette: {
      primary: Palette;
      secondary: Palette;
      tertiary: Palette;
      gray: string;
    };
  }
}
