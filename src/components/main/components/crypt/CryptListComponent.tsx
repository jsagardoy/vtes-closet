import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react'
import { CryptType } from '../../../../types/crypt_type';
import { getDiscIcon } from '../../../../util/helpFunction';

interface Props {
    list: CryptType[];
    handleOpen: (crypt: CryptType, index:number) => void;
}

const CryptListComponent = (props: Props) => {
    const { list, handleOpen } = props;
    return (
      <List className='crypt__list'>
        {list.length === 0 ? (
          <div className='span__no__result'>
            <span>No results</span>
          </div>
        ) : (
          list.map((crypt: CryptType, index: number) => (
            <div key={crypt.id}>
              <ListItem
                key={crypt.id}
                button
                divider
                dense
                alignItems='flex-start'
                onClick={() => handleOpen(crypt, index)}
              >
                <ListItemText
                  className='list__item'
                  primary={crypt.name}
                  secondary={`${crypt.clans.map((clan) => clan)}: ${
                    crypt.group
                  }`}
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
}

export default CryptListComponent
