import { List } from '@material-ui/core';
import { ListItemButton, ListItemText } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './Sidebar.css';
const Sidebar = () => {
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
    switch (cardType) {
      case 'Crypt':
        history.push('/crypt');
        break;
      default:
        console.log('por otro lado');
        break;
    }
  };

  return (
    <div className='sidebar'>
      <div className='list__container'>
        <List className='list'>
          <ListItemButton
            alignItems='flex-start'
            dense
            divider
            style={{ borderBottomColor: 'darkcyan' }}
            onClick={() => handleClick('Crypt')}
          >
            <ListItemText primary='Crypt' />
          </ListItemButton>
          <ListItemButton
            alignItems='flex-start'
            dense
            divider
            style={{ borderBottomColor: 'darkcyan' }}
          >
            <ListItemText primary='Library' />
          </ListItemButton>
          <div className='privateSidebar' hidden={user ? false : true}>
            <ListItemButton
              alignItems='flex-start'
              dense
              divider
              style={{ borderBottomColor: 'darkcyan' }}
            >
              <ListItemText primary='Decks' />
            </ListItemButton>
            <ListItemButton
              className='listItem'
              alignItems='flex-start'
              dense
              divider
              style={{ borderBottomColor: 'darkcyan' }}
            >
              <ListItemText
                className={'listItemText'}
                primary='Collection'
                secondary='Crypt'
                secondaryTypographyProps={{
                  color: 'darkcyan',
                }}
              />
            </ListItemButton>
            <ListItemButton
              alignItems='flex-start'
              dense
              divider
              style={{ borderBottomColor: 'darkcyan' }}
            >
              <ListItemText
                className={'listItemText'}
                primary='Collection'
                secondary='Library'
                secondaryTypographyProps={{
                  color: 'darkcyan',
                }}
              />
            </ListItemButton>
          </div>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
