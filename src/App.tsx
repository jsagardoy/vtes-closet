import './App.css';

import {
  Container,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import ArchonContainer from './components/main/containers/ArchonContainer';
import { Box } from '@mui/system';
import { CardType } from './types/deck_type';
import CryptContainer from './components/main/containers/CryptContainer';
import { CryptType } from './types/crypt_type';
import DeckContainer from './components/main/containers/DeckContainer';
import DecksContainer from './components/main/containers/DecksContainer';
import FinalContainer from './components/main/containers/FinalContainer';
import Header from './components/Header';
import InventoryCryptContainer from './components/main/containers/InventoryCryptContainer';
import InventoryLibraryContainer from './components/main/containers/InventoryLibraryContainer';
import LibraryContainer from './components/main/containers/LibraryContainer';
import { LibraryType } from './types/library_type';
import MyTournamentsContainer from './components/main/containers/MyTournamentsContainer';
import NewTournament from './components/main/containers/NewTournament';
import PageDeniedAccess from './components/PageDeniedAccess';
import PrivateMain from './components/main/components/main/PrivateMain';
import PrivateRoute from './components/PrivateRoute';
import ProfileContainer from './components/main/components/user/ProfileContainer';
import PublicMain from './components/main/components/main/PublicMain';
import RoundsContainer from './components/main/containers/RoundsContainer';
import Sidebar from './components/Sidebar';
import TournamentInfo from './components/main/components/tournaments/TournamentInfo';
import TournamentsContainer from './components/main/containers/TournamentsContainer';

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

  const handleCloseModal = (cardType: CardType) => {};

  const initialMode: PaletteMode = window.localStorage.getItem(
    'mode'
  ) as PaletteMode;
  const [mode, setMode] = React.useState<PaletteMode>(
    initialMode === 'light' ? 'light' : 'dark'
  );
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
    window.localStorage.setItem('mode', mode);
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
              <Route exact path={'/accessDenied'}>
                <PageDeniedAccess />
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
                  handleCloseModal={(cardType: CardType) =>
                    handleCloseModal(cardType)
                  }
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
              {/* Profile */}
              <PrivateRoute
                isLogged={isLogged}
                component={ProfileContainer}
                exact
                path='/profile/:userId'
              />
              {/* Tournaments */}
              <PrivateRoute
                isLogged={isLogged}
                component={TournamentsContainer}
                exact
                path='/tournaments/'
              />
              {/* Tournament */}
              <PrivateRoute
                isLogged={isLogged}
                component={NewTournament}
                exact
                path='/tournament/:tournamentId'
              />
              {/* Tournament info*/}
              <PrivateRoute
                isLogged={isLogged}
                component={TournamentInfo}
                exact
                path='/tournament/info/:tournamentId'
              />
              <PrivateRoute
                isLogged={isLogged}
                component={MyTournamentsContainer}
                exact
                path='/myTournamets/:tournamentId'
              />
              <PrivateRoute
                isLogged={isLogged}
                component={ArchonContainer}
                exact
                path='/archon/:tournamentId'
              />
              <PrivateRoute
                isLogged={isLogged}
                component={RoundsContainer}
                exact
                path='/archon/:tournamentId/round/:round'
              />
              <PrivateRoute
                isLogged={isLogged}
                component={FinalContainer}
                exact
                path='/archon/:tournamentId/final'
              />
            </Switch>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
