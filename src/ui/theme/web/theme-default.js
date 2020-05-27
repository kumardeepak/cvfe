import { createMuiTheme } from '@material-ui/core/styles';


const themeDefault = createMuiTheme({

  typography: {
    fontFamily: '"Source Sans Pro", "Arial", sans-serif',
    fontSize: '5rem'
  },
  palette: {
    primary: {
      light: '#1976d2',
      main: '#1976d2',
      dark: '1976d2',
      contrastText: '#FFFFFF',
      color:'inherit'
    },
    secondary: {
      light: '#09d6a1',
      main: '#09d6a1',
      dark: '09d6a1',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#C0C0C0'
    }
  },
  status: {
    danger: 'orange'
  },
  drawer: {
    default: '#696969'
  }

});


export default themeDefault;
