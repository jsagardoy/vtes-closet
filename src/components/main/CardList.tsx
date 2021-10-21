import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './CardList.css';
import { CryptType } from '../../types/crypt_type';

interface listProps {
  cardType: string; //library/crypt
  list: [CryptType]; //habrá que hacer también la opción para las cartas de librería
}

const list = (props: listProps) => {
  const { list, cardType } = props;
  return (
    <List className='list'>
      {cardType === 'Library' ? (
        <ListItem button divider dense alignItems='flex-start'>
          <ListItemText
            className={'listItemText'}
            /* primary={cardData} 
              secondary={cardData} */
          />
        </ListItem>
      ) : (
        list.map((crypt: CryptType) => (
          <ListItem button divider dense alignItems='flex-start'>
            <ListItemText primary={crypt.name} secondary={crypt.clan} />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default list;
