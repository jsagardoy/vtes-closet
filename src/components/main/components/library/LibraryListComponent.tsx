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
import InfiniteScroll from 'react-infinite-scroll-component';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getClanIcon,
  getDiscIcon,
  getCardTypesIcon,
  getCardCost,
} from '../../../../util';
import { Spinner } from '../global/Spinner';

interface Props {
  handleItemToOpen: (library: LibraryType) => void;
  initialValue: LibraryType[];
  list: LibraryType[];
}

const LibraryListComponent = (props: Props) => {
  const { list, handleItemToOpen, initialValue } = props;

  const [items, setItems] = React.useState<LibraryType[]>([]);

  const isElement = (elem: LibraryType, index: number): number => {
    return elem && items.length > 0 && elem.id === items[items.length - 1].id
      ? index
      : -1;
  };

  const fetchMoreData = () => {
    if (list) {
      const initItem: number | undefined = list
        .map((elem, index) => isElement(elem, index))
        .find((elem) => elem !== -1);
      if (initItem) {
        setItems(
          items.concat([
            ...list.slice(initItem + 1, initItem ? initItem + 21 : 0 + 20),
          ])
        );
      }
    }
  };

  React.useEffect(() => {
    setItems(initialValue);
  }, [initialValue, list]);

  if (list.length === 0) {
    return <></>;
  }
if (items.length === 0) {
  return (
    <p
      style={{
        textAlign: 'center',
        color: 'Darkcyan',
        marginBottom: '1em',
      }}
    >
      No results
    </p>
  );
}
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={items.length !== list.length}
      loader={<Spinner />}
      style={{ overflow: 'hidden' }}
      endMessage={
        <p
          style={{
            textAlign: 'center',
            color: 'Darkcyan',
            marginBottom: '1em',
          }}
        >
          No more content
        </p>
      }
    >
      <List className='crypt__list'>
        {items.length === 0 ? (
          <div className='span__no__result'>
            <span>No results</span>
          </div>
        ) : (
          items.map((library: LibraryType) => (
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
                          alt='Pool cost'
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
    </InfiniteScroll>
  );
};

export default LibraryListComponent;
