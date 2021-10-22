import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import './CardList.css';
import { CryptType } from '../../types/crypt_type';

interface listProps {
  cardType: string; //library/crypt
  list: CryptType[]; //habrá que hacer también la opción para las cartas de librería
}

const list = (props: listProps) => {
  const baseURL = 'https://static.krcg.org/png_wb/disc/';

  const getDiscIcon = (discs: string[]): string[] => {
    let resp: string[] = [];
    if (discs) {
      discs.map((disc) => {
        let value = disc.substr(0, 3);

        switch (value) {
          case 'viz':
            value = 'vin';
            break;
          case 'jud':
            value = 'jus';
            break;
        }

        if (value.toUpperCase() === value)
          return resp.push(`${baseURL}/sup/${value.toLowerCase()}.png`);
        else return resp.push(`${baseURL}/inf/${value}.png`);
      });
    }
    return resp;
  };

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
          <div key={crypt.id}>
            <ListItem
              key={crypt.id}
              button
              divider
              dense
              alignItems='flex-start'
            >
              <ListItemText
                className='list__item'
                primary={crypt.name}
                //secondary={`${crypt.clans.map((clan) => clan)}: ${crypt.group}`}
              />
              <div className='list__left'>
                {getDiscIcon(crypt.disciplines).map((dis) => {
                  return (
                    <ListItemAvatar
                      className='list__avatar__icons'
                      key={crypt.id && dis}
                    >
                      <Avatar src={dis} alt={dis} />
                    </ListItemAvatar>
                  );
                })}
                <ListItemText
                  className='list__item__icons'
                  primary={crypt.capacity}
                  //secondary={getDiscIcon(crypt.discipline)}
                />
              </div>
            </ListItem>
          </div>
        ))
      )}
    </List>
  );
};

export default list;
