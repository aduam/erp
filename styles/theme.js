import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#42a5f5',
      light: '#80d6ff',
      dark: '#0077c2',
      contrastText: '#000',
    },
    secondary: {
      main: '#8e24aa',
      light: '#c158dc',
      dark: '#5c007a',
      contrastText: '#fff',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    neutral: {
      main: '#9e9e9e',
    },
    text: {
      main: '#795548'
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Lato',
      fontSize: '45px',
      fontWeight: 'normal'
    },
    h2: {
      fontFamily: 'Lato',
      fontSize: '35px',
      fontWeight: 'normal'
    },
    h3: {
      fontFamily: 'Lato',
      fontSize: '30px',
      fontWeight: 'normal'
    },
    h4: {
      fontFamily: 'Lato',
      fontSize: '25px',
      fontWeight: 'normal'
    },
    h5: {
      fontFamily: 'Lato',
      fontSize: '22px',
      fontWeight: 'normal'
    },
    h6: {
      fontFamily: 'Lato',
      fontSize: '20px',
      fontWeight: 'normal'
    },
    subtitle1: {
      fontFamily: 'Lato',
      fontSize: '17px',
      fontWeight: 'bold'
    },
    subtitle2: {
      fontFamily: 'Lato',
      fontSize: '15px',
      fontWeight: 'bold'
    },
    body1: {
      fontFamily: 'Lato',
      fontSize: '17px',
      fontWeight: 'normal'
    },
    body2: {
      fontFamily: 'Lato',
      fontSize: '15px',
      fontWeight: 'normal'
    },
    caption: {
      fontFamily: 'Lato',
      fontSize: '13px',
      fontWeight: 'bold'
    },
    overline: {
      fontFamily: 'Lato',
      fontSize: '13px',
      fontWeight: 'normal'
    },
    button: {
      fontFamily: 'Lato',
      fontSize: '13px',
      fontWeight: 'normal',
      color: '#fff'
    },
  }
})

export default theme