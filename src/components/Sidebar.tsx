import { List } from '@material-ui/core';
import { ListItemButton, ListItemText } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import './Sidebar.css';
import { getUserId } from '../util';

interface Props {
  toogle: boolean;
  handleToogle: () => void;
}

const Sidebar = (props: Props) => {
  const { toogle, handleToogle } = props;
  const auth = getAuth();
  const [user, setUser] = React.useState<any>(auth);
  const history: any = useHistory();
  const matches = useMediaQuery('(max-width:600px)');

  onAuthStateChanged(auth, (us) => {
    if (us) {
      setUser(us);
    } else {
      setUser(null);
    }
  });

  const handleClick = (cardType: string) => {
    const userId = getUserId();
    switch (cardType) {
      case 'Crypt':
        if (matches) {
          handleToogle();
        }
        history.push('/crypt');
        break;
      case 'Library':
        if (matches) {
          handleToogle();
        }
        history.push('/library');
        break;
      case 'InventoryLibrary':
        if (matches) {
          handleToogle();
        }
        history.push(`/private/:${userId}/inventory/library`);
        break;
      case 'InventoryCrypt':
        if (matches) {
          handleToogle();
        }
          history.push(`/private/:${userId}/inventory/crypt`);
        break;
      
      default:
        if (matches) {
          handleToogle();
        }
        console.log('Wrong error');
        break;
    }
  };

  return (
    <aside className={toogle ? 'sidebar' : 'hidden'}>
      <div className='list__container'>
        <List className='list'>
          <ListItemButton
            alignItems='center'
            dense
            divider
            disableGutters
            style={{
              borderBottomColor: 'darkcyan',
              width: '100%',
              textAlign: 'center',
            }}
            onClick={() => handleClick('Crypt')}
          >
            <ListItemText primary='Crypt' />
          </ListItemButton>
          <ListItemButton
            alignItems='center'
            divider
            disableGutters
            style={{
              borderBottomColor: 'darkcyan',
              width: '100%',
              textAlign: 'center',
            }}
            onClick={() => handleClick('Library')}
          >
            <ListItemText primary='Library' />
          </ListItemButton>
          {user ? (
            <div className='list'>
              <ListItemButton
                alignItems='center'
                dense
                divider
                disableGutters
                style={{
                  borderBottomColor: 'darkcyan',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <ListItemText primary='Decks' />
              </ListItemButton>
              <ListItemButton
                className='listItem'
                alignItems='flex-start'
                dense
                divider
                disableGutters
                style={{
                  borderBottomColor: 'darkcyan',
                  width: '100%',
                  textAlign: 'center',
                }}
                onClick={() => handleClick('InventoryCrypt')}
              >
                <ListItemText
                  className={'listItemText'}
                  primary='Crypt Collection'
                  secondaryTypographyProps={{
                    color: 'darkcyan',
                  }}
                />
              </ListItemButton>
              <ListItemButton
                alignItems='flex-start'
                dense
                divider
                disableGutters
                style={{
                  borderBottomColor: 'darkcyan',
                  width: '100%',
                  textAlign: 'center',
                }}
                onClick={() => handleClick('InventoryLibrary')}
              >
                <ListItemText
                  className={'listItemText'}
                  primary='Library Collection'
                  secondaryTypographyProps={{
                    color: 'darkcyan',
                  }}
                />
              </ListItemButton>
            </div>
          ) : (
            <></>
          )}
        </List>
      </div>
    </aside>
  );
};
export default Sidebar;
