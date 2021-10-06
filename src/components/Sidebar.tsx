import { List, ListItem } from '@material-ui/core';
import { ListItemText } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';

import './Sidebar.css';
const Sidebar = () => {
  const auth = getAuth();
  const [user, setUser] = React.useState<any>(auth);

  onAuthStateChanged (auth, (us) => {
    if (us) {
      setUser(us);
    }
    else {
      setUser(null);
    }
  });

  return (
    <div className='sidebar'>
      <div className='list__container'>
        <List className='list'>
          <ListItem
            alignItems='flex-start'
            button
            dense
            divider
            style={{ borderBottomColor: 'darkcyan' }}
          >
            <ListItemText primary='Crypt' />
          </ListItem>
          <ListItem
            alignItems='flex-start'
            button
            dense
            divider
            style={{ borderBottomColor: 'darkcyan' }}
          >
            <ListItemText primary='Library' />
          </ListItem>
          <div className='privateSidebar' hidden={user?false:true}>
            <ListItem
              alignItems='flex-start'
              button
              dense
              divider
              style={{ borderBottomColor: 'darkcyan' }}
            >
              <ListItemText primary='Decks' />
          </ListItem>
          <ListItem
            className='listItem'
            alignItems='flex-start'
            button
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
          </ListItem>
          <ListItem
            alignItems='flex-start'
            button
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
          </ListItem>
          </div>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
