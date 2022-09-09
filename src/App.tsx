import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';
import CryptContainer from './components/main/containers/CryptContainer';
import LibraryContainer from './components/main/containers/LibraryContainer';
import PublicMain from './components/main/components/main/PublicMain';
import PrivateMain from './components/main/components/main/PrivateMain';
import InventoryCryptContainer from './components/main/containers/InventoryCryptContainer';
import InventoryLibraryContainer from './components/main/containers/InventoryLibraryContainer';
import DecksContainer from './components/main/containers/DecksContainer';
import DeckContainer from './components/main/containers/DeckContainer';
import { CryptType } from './types/crypt_type';
import { CardType } from './types/deck_type';
import { LibraryType } from './types/library_type';
import {
  Container,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import { Box } from '@mui/system';

function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [toogleSidebar, setToogleSidebar] = React.useState<boolean>(false);
  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const history = useHistory();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      history.push('/');
    }
  });

  const handleClickMenuIcon = () => setToogleSidebar((prev) => !prev);
  //only added becauser needed to reuse component
  const handleAddCardToDeck = (
    card: LibraryType | CryptType,
    cardType: CardType
  ) => { };
  
  const handleCloseModal = (cardType: CardType) => { };

  const initialMode: PaletteMode = window.localStorage.getItem(
    'mode'
  ) as PaletteMode;
  const [mode, setMode] = React.useState<PaletteMode>(initialMode ?? 'light');
  useEffect(() => {}, []);
  const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    typography: {
      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              light: '#5097cc',
              main: '#06699b',
              dark: '#003f6c',
            },
            secondary: {
              main: '#9b3806',
              light: '#d26634',
              dark: '#670300',
            },
            background: {
              default: '#fff',
              paper: '#fff',
            },
            text: {
              primary: '#383838',
              secondary: '#06699b',
            },
          }
        : {
            // palette values for dark mode
            primary: {
              light: '#ffffff',
              main: '#fff',
              dark: '#cccccc',
            },
            secondary: {
              main: '#c3d001',
              light: '#f9ff4f',
              dark: '##8e9f00',
            },
            background: {
              default: '#121212',
              paper: '#383838',
            },
            text: {
              primary: '#fff',
              secondary: '#c3d001',
            },
          }),
    },
  });

  const colorMode = React.useMemo(() => {
    window.localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
    return {
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    };
  }, [mode]);

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ maxWidth: 'false' }} disableGutters>
          <Box className='main__header'>
            <Header
              paletteMode={theme.palette.mode}
              handleColorMode={colorMode.toggleColorMode}
              handleClickLogo={handleClickMenuIcon}
            />
          </Box>
          <Box className='mainApp'>
            <Sidebar
              toogle={toogleSidebar}
              handleToogle={handleClickMenuIcon}
            />
            <Switch>
              <Route exact path={'/'}>
                {isLogged && window.localStorage.getItem('auth') ? (
                  <Redirect to='private' />
                ) : (
                  <PublicMain toogle={toogleSidebar} />
                )}
              </Route>
              <Route exact path={'/crypt'}>
                <CryptContainer
                  deckMode={false}
                  toogle={toogleSidebar}
                  handleAddCardToDeck={(
                    card: LibraryType | CryptType,
                    cardType: CardType
                  ) => {
                    handleAddCardToDeck(card, cardType);
                  }}
                  handleCloseModal={(cardType:CardType)=>handleCloseModal(cardType)}
                />
              </Route>
              <Route exact path={'/library'} component={LibraryContainer} />
              <PrivateRoute
                isLogged={isLogged}
                component={PrivateMain}
                exact
                path='/private'
              />
              {/* Decks */}
              <PrivateRoute
                isLogged={isLogged}
                component={DecksContainer}
                exact
                path='/private/:userId/decks'
              />
              {/* Deck */}
              <PrivateRoute
                isLogged={isLogged}
                component={DeckContainer}
                exact
                path='/private/:userId/decks/:deckId'
              />
              {/* inventario */}

              <PrivateRoute
                isLogged={isLogged}
                component={InventoryCryptContainer}
                exact
                path='/private/:userId/inventory/crypt'
              />
              <PrivateRoute
                isLogged={isLogged}
                component={InventoryLibraryContainer}
                exact
                path='/private/:userId/inventory/library'
              />
            </Switch>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
