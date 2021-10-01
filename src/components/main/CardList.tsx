import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './CardList.css';

interface CardListProps {
  cardType: string; //library/crypt
  cardData: string; //habrá que genera run tipo con cada imagen
}

const CardList = (props: CardListProps) => {
  const { cardData, cardType } = props;
  return (
    <div className='cardList'>
      <List className='list'>
        {cardType === 'Library' ? (
          <ListItem button divider dense alignItems='flex-start'>
            <ListItemText
              className={'listItemText'}
              primary={cardData} 
              secondary={cardData}
            />
          </ListItem>
        ) : (
          <ListItem button divider dense alignItems='flex-start'>
            <ListItemText primary={cardData} />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default CardList;
