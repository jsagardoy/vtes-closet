import { ListItemAvatar } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { LibraryType } from '../../../../types/library_type';
import { getCardTypes, getClanIcon, getDiscIcon } from '../../../../util';

interface LibraryListProps {
  list: LibraryType[];
}

const LibraryList = (props: LibraryListProps) => {
  const URLBase = 'https://static.krcg.org/png/icon/';
  const { list } = props;

  return (
    <div>
      <List className='crypt__list'>
        {list.length === 0 ? (
          <div className='span__no__result'>
            <span>No results</span>
          </div>
        ) : (
          list.map((library: LibraryType, index: number) => (
            <ListItem
              key={library.id}
              button
              divider
              dense
              alignItems='flex-start'
              /* onClick={() => handleOpen(crypt, index)} */
            >
              <ListItemText className='list__item' primary={library.name} />
              {getClanIcon(library.clans).map((clan: string, index) => (
                <ListItemAvatar className='list__avatar__icons'>
                  <Avatar key={clan && library.id} src={clan} alt={clan} />
                </ListItemAvatar>
              ))}
              <ListItemAvatar className='list__avatar__icons'>
                {library.burn_option ? (
                  <Avatar src={`${URLBase}burn.png`} alt='Burn option' />
                ) : (
                  <></>
                )}
              </ListItemAvatar>
              {getCardTypes(library.types).map((type: string, index) => (
                <ListItemAvatar className='list__avatar__icons'>
                  <Avatar
                    key={type && library.id}
                    src={type}
                    alt={type}
                  />
                </ListItemAvatar>
              ))}
              {library.disciplines ? (
                getDiscIcon(library.disciplines).map((disc) => (
                  <ListItemAvatar className='list__avatar__icons'>
                    <Avatar
                      key={library.id}
                      src={disc}
                      alt={disc}
                    />
                  </ListItemAvatar>
                ))
              ) : (
                <></>
              )}
              <ListItemAvatar className='list__avatar__icons'>
                {library.blood_cost ? (
                  <Avatar
                    src={`${URLBase}blood${library.blood_cost}.png`}
                    alt='Blood cost'
                  />
                ) : (
                  <></>
                )}
              </ListItemAvatar>
              <ListItemAvatar className='list__avatar__icons'>
                {library.pool_cost ? (
                  <Avatar
                    src={`${URLBase}pool${library.pool_cost}.png`}
                    alt='Blood cost'
                  />
                ) : (
                  <></>
                )}
              </ListItemAvatar>

              {/* 
                secondary={library.types.map((t: string, index) => (
                  <Avatar src={`${URLBase}${t.toLowerCase()}.png`} alt={t} />
                ))}
              /> */}
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default LibraryList;
