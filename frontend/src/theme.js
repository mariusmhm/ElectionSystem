import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

//official HDM domain colors:
const white = '#ffffff';
const darkGray = '#3e4847';
const red = '#e31134';
const lightGray= '#f6f6f6';
const hoverGray= '#c6c6c6'

//Creating a costume theme for this app:

const theme = createMuiTheme({
  palette:{
    darkGray,
    red,
    white,
    primary: {
        contrastText: white,
        main: darkGray,
        light: lightGray,
        dark: hoverGray
    },
    secondary: {
        contrastText: white,
        main:'red'
    },
    warning:{
        contrastText: white,
        dark:'#f57c00',
        main:'#ff9800',
        light:'#ffb74d'
    },
    error: {
        contrastText: white,
        dark:'#d32f2f',
        main: colors.red[600],
        light:'#f44336'
    },
    success: {
        contrastText: white,
        dark:'#388e3c',
        main: '#4caf50',
        light:'#81c784'
    },
    background: {
        default: white
    },
    text:{
        primary: darkGray ,
        link: '#1976d2',
        fontFamily: Arial
    },
    info: {
        contrastText: white,
        dark:'#1976d2',
        main:'#2196f3',
        light:'#64b5f6'
    }
  }
});
export default theme;
