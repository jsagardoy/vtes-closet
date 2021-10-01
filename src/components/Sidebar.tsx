import { List, ListItem } from '@material-ui/core';
import { ListItemText } from '@mui/material';

import './Sidebar.css';
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='list__container'>
        <List className='list'>
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
          <ListItem
            alignItems='flex-start'
            button
            dense
            divider
            style={{ borderBottomColor: 'darkcyan' }}
          >
            <ListItemText primary='Decks' />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
