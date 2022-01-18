import React, { createContext, useContext, useMemo, useState } from 'react';

import NavBar from './NavBar';
import HomePage from './HomePage';
import CollectionPage from './CollectionPage';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import '../css/App.css';

export const ThemeContextFunc = createContext({ ChangeTheme: () => { } });

export const lightTheme = createTheme({
  palette: {
    type: 'Light',
    primary: {
      main: '#e0dee2',
    },
    secondary: {
      main: '#434441',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'Dark',
    primary: {
      main: '#222320',
    },
    secondary: {
      main: '#bdbbbf',
    },
    background: {
      paper: '#424242',
      default: '#303030',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)',
      hint: 'rgba(255,255,255,0.5)',
    },
    divider: 'rgba(255,255,255,0.12)'
  },
});


const earthTheme = createTheme({
  palette: {
    type: 'Earth',
    primary: {
      main: '#1d59a1',
    },
    secondary: {
      main: '#008984',
    },
    background: {
      default: 'rgb(51, 160, 156)',
      paper: '#1b76b9',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)',
      hint: 'rgba(255,255,255,0.5)',
    },
    divider: 'rgba(255,255,255,0.12)'
  }
});

const mercuryTheme = createTheme({
  palette: {
    type: 'Mercury',
    primary: {
      main: '#404040',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#303030',
      paper: '#c2c2c2',
    }
  }
});

const venusTheme = createTheme({
  palette: {
    type: 'Venus',
    primary: {
      main: '#B1681B',
    },
    secondary: {
      main: '#F1EDE8',
    },
    background: {
      paper: '#BE9865',
      default: 'rgb(123, 72, 18)',
    }
  }
});

const marsTheme = createTheme({
  palette: {
    type: 'Mars',
    primary: {
      main: '#451804',
      light: '#c1440e',
      dark: '#500c00',
    },
    secondary: {
      main: '#801220',
    },
    background: {
      paper: '#FF9D6F',
      default: '#c1440e',
    },
    divider: 'rgba(0,0,0,0.3)',
  }
});

const jupiterTheme = createTheme({
  palette: {
    type: 'Jupiter',
    primary: {
      main: '#194f65',
    },
    secondary: {
      main: '#f3deb3',
    },
    background: {
      default: '#fff4d8',
      paper: '#f3deb3',
    },
  }
});

const saturnTheme = createTheme({
  palette: {
    type: 'Saturn',
    primary: {
      main: '#eae1a9',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: 'rgb(238, 231, 186)',
      default: '#1e1e1e',
    },
  }
});

const uranusTheme = createTheme({
  palette: {
    type: 'Uranus',
    primary: {
      main: '#9bbfdf',
    },
    secondary: {
      main: '#0e7be9',
    },
    background: {
      paper: 'rgb(198, 225, 248)',
      default: 'rgb(62, 149, 237)',
    },
  }
});

const neptuneTheme = createTheme({
  palette: {
    type: 'Neptune',
    primary: {
      main: 'rgb(0, 74, 171)',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#86c7ff',
      paper: '#023171',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)',
      hint: 'rgba(255,255,255,0.5)',
    },
    divider: 'rgba(255,255,255,0.12)'
  }
});

function App() {

  const [mode, setMode] = useState( (!!localStorage.getItem('myTheme'))? localStorage.getItem('myTheme') : "Light" );

  const ThemeChanger = {
    ChangeTheme: (m) => { setMode(m) }
  }

  const theme = useMemo(() => {
    switch (mode) {

      case "Dark":
        return darkTheme;

      case "Earth":
        return earthTheme;

      case "Mercury":
        return mercuryTheme;

      case "Venus":
        return venusTheme;

      case "Mars":
        return marsTheme;

      case "Jupiter":
        return jupiterTheme;

      case "Saturn":
        return saturnTheme;

      case "Uranus":
        return uranusTheme;

      case "Neptune":
        return neptuneTheme;

      case "Light":
      default:
        return lightTheme;
    }
  }, [mode])

  return (
    <ThemeContextFunc.Provider value={ThemeChanger}>
      <ThemeProvider theme={theme}>
        <div className="App">

          <NavBar />
          <Box sx={{ minHeight: "90vh", backgroundColor: "background.default" }}>
            <Routes>
              <Route path={process.env.PUBLIC_URL+"/"} element={<HomePage />} />
              <Route path={process.env.PUBLIC_URL+"/Collections"} element={<CollectionPage />} />
            </Routes>
          </Box>
        </div>
      </ThemeProvider >
    </ThemeContextFunc.Provider>
  );
}

export default App;
