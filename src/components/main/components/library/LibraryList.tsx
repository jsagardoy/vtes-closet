import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import Table from '@mui/material/Table';
import { LibraryType } from '../../../../types/library_type';
import { getCardTypes, getClanIcon, getDiscIcon } from '../../../../util';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

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
          list.map((library: LibraryType) => (
            <ListItem
              key={library.id}
              button
              divider
              dense
              alignItems='flex-start'
            >
              <Table id='table__library'>
                <TableBody id='table__body'>
                  <TableRow
                    id='table__row'
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <TableCell
                      align='left'
                      size='small'
                      id='table__cell'
                      sx={{
                        border: 0,
                        width: '50%',
                        color: 'darkcyan',
                      }}
                    >
                      {library.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '5%',
                      }}
                      align='right'
                      size='small'
                      id='table__cell'
                    >
                      {library.burn_option ? (
                        <Avatar src={`${URLBase}burn.png`} alt='Burn option' />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '5%',
                      }}
                      align='right'
                      size='small'
                      id='table__cell'
                    >
                      {library.clans ? (
                        getClanIcon(library.clans).map(
                          (clan: string, index: number) => (
                            <Avatar
                              key={clan && library.id && index}
                              src={clan}
                              alt={clan}
                            />
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '17.5%',
                      }}
                      align='right'
                      size='small'
                      id='table__cell'
                    >
                      {library.disciplines ? (
                        getDiscIcon(library.disciplines).map(
                          (disc: string, index: number) => (
                            <Avatar
                              key={disc && library.id && index}
                              src={disc}
                              alt={disc}
                            />
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '17.5%',
                      }}
                      align='right'
                      size='small'
                      id='table__cell'
                    >
                      {getCardTypes(library.types).map(
                        (type: string, index: number) => (
                          <Avatar
                            key={type && library.id && index}
                            src={type}
                            alt={type}
                          />
                        )
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '5%',
                      }}
                      align='right'
                      size='small'
                      id='table__cell'
                    >
                      {library.blood_cost ? (
                        <Avatar
                          src={`${URLBase}blood${library.blood_cost}.png`}
                          alt='Blood cost'
                        />
                      ) : library.pool_cost ? (
                        <Avatar
                          src={`${URLBase}pool${library.pool_cost}.png`}
                          alt='Blood cost'
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default LibraryList;
