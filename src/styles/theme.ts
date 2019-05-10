import { createMuiTheme } from '@material-ui/core';
import { DefaultTheme } from 'styled-components';

const palette = {
  primary: {
    main: '#397db5',
    dark: '#2e2e2e',
    contrastText: '#fefefe',
  },
  secondary: {
    main: '#54b2ce',
    dark: '#2e2e2e',
    contrastText: '#fefefe',
  },
  tertiary: {
    main: '#213c4d',
    dark: '#2e2e2e',
    contrastText: '#fefefe',
  },
  gray: '#d1d5da',
};
export const materialTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette,
});
export const styledTheme: DefaultTheme = { palette };
