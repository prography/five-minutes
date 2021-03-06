import { createMuiTheme } from '@material-ui/core/styles';
import { DefaultTheme } from 'styled-components';

const palette = {
  primary: {
    main: '#1e69b5',
    dark: '#2962ff',
    contrastText: '#fefefe',
  },
  secondary: {
    main: '#54b2ce',
    dark: '#2c839c',
    contrastText: '#fefefe',
  },
  tertiary: {
    main: '#213c4d',
    dark: '#2e2e2e',
    contrastText: '#fefefe',
  },
  darkGray: '#90a4ae',
  gray: '#d1d5da',
  negative: '#da3d4d',
};
export const materialTheme = createMuiTheme({
  palette,
});
export const styledTheme: DefaultTheme = { palette };
