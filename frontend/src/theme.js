import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

//official HDM domain colors:
const primary_white = '#e0ddde';
const primary_gray = '#3c4a46';
const primary_red = '#e21938';

//Creating a costume theme for this app:

const theme = createMuiTheme({
  palette:{
    primary_gray,
    primary_red,
    primary_red,
    primary: {
        contrastText: white,
        main: primary_gray,
    },
    secondary: {
        contrastText: white,
        main:'#3a5353'
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
        default: primary_white
    },
    text:{
        primary: primary_gray ,
        link: #1976d2
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
