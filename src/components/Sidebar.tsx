import { List, ListItemButton, ListItemText } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
        handleToogle();
        history.push('/crypt');
        break;
      case 'Library':
        handleToogle();
        history.push('/library');
        break;
      case 'Decks':
        handleToogle();
        history.push(`/private/:${userId}/decks`);
        break;
      case 'InventoryLibrary':
        handleToogle();
        history.push(`/private/:${userId}/inventory/library`);
        break;
      case 'InventoryCrypt':
        handleToogle();
        history.push(`/private/:${userId}/inventory/crypt`);
        break;
      default:
        handleToogle();
        alert('Wrong error');
        break;
    }
  };

  return toogle ? (
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
                onClick={() => handleClick('Decks')}
              >
                <ListItemText
                  className={'listItemText'}
                  primary='Decks'
                  secondaryTypographyProps={{
                    color: 'darkcyan',
                  }}
                />
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
  ) : null;
};
export default Sidebar;
