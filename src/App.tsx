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
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { amber, grey, deepOrange } from '@mui/material/colors';

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
  ) => {};

  useEffect(() => {}, []);

  const [mode, setMode] = React.useState<PaletteMode>('light');

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );
  <ColorModeContext.Provider value={colorMode}></ColorModeContext.Provider>;

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  /*   const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
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
          }
        : {
            primary: {
              light: '#5097cc',
              main: 'black',
              dark: '#003f6c',
            },
            secondary: {
              main: 'red',
              light: '#d26634',
              dark: '#670300',
            },
          }),
    },
  }); */

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <div className='main__header'>
          <Header
            paletteMode={theme.palette.mode}
            handleColorMode={colorMode.toggleColorMode}
            handleClickLogo={handleClickMenuIcon}
          />
        </div>
        <div className='mainApp'>
          <Sidebar toogle={toogleSidebar} handleToogle={handleClickMenuIcon} />
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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
