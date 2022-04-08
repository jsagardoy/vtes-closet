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
                <TableBody>
                  <TableRow sx={{ display: 'flex' }}>
                    <div className='table__name'>
                      <TableCell
                        align='left'
                        size='small'
                        id='table__cell'
                        sx={{
                          display: 'flex',
                          border: 0,
                          color: 'darkcyan',
                        }}
                      >
                        {library.name}
                      </TableCell>
                    </div>
                    <div className='table__icons'>
                      {library.burn_option ? (
                        <TableCell
                          sx={{
                            border: 0,
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                          size='small'
                          id='table__cell'
                        >
                          <Avatar src={getBurnOption()} alt='Burn option' />
                        </TableCell>
                      ) : null}
                      <div className='clans__list'>
                        {library.clans ? (
                          <TableCell
                            sx={{
                              border: 0,
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                            size='small'
                            id='table__cell'
                          >
                            {getClanIcon(library.clans).map(
                              (clan: string, index: number) => (
                                <Avatar
                                  key={clan && library.id && index}
                                  src={clan}
                                  alt={clan}
                                />
                              )
                            )}
                          </TableCell>
                        ) : null}
                      </div>
                      <div className='dicipline__list'>
                        {library.disciplines ? (
                          <TableCell
                            sx={{
                              border: 0,
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                            size='small'
                            id='table__cell'
                          >
                            {getDiscIcon(library.disciplines).map(
                              (disc: string, index: number) => (
                                <Avatar
                                  key={disc && library.id && index}
                                  src={disc}
                                  alt={disc}
                                />
                              )
                            )}
                          </TableCell>
                        ) : null}
                      </div>
                      <div className='type__list'>
                        <TableCell
                          sx={{
                            border: 0,
                            display: 'flex',
                            flexDirection: 'row',
                          }}
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
                      </div>
                      <div className='cost__list'>
                        {library.blood_cost || library.pool_cost ? (
                          <TableCell
                            sx={{
                              border: 0,
                              display: 'flex',
                              flexDirection: 'row',
                            }}
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
                            ) : null}
                          </TableCell>
                        ) : null}
                      </div>
                    </div>
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
