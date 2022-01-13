import {
  Avatar,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getClanIcon,
  getDiscIcon,
  getCardTypesIcon,
  getCardCost,
} from '../../../../util';

interface Props {
  handleItemToOpen: (library: LibraryType) => void;
  list: LibraryType[];
}

const LibraryListComponent = (props: Props) => {
  const { list, handleItemToOpen } = props;
  return (
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
            onClick={() => handleItemToOpen(library)}
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
                      <Avatar src={getBurnOption()} alt='Burn option' />
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
                    {getCardTypesIcon(library.types).map(
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
                        src={getCardCost(library.blood_cost, 'blood')}
                        alt='Blood cost'
                      />
                    ) : library.pool_cost ? (
                      <Avatar
                        src={getCardCost(library.pool_cost, 'pool')}
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
  );
};

export default LibraryListComponent;
