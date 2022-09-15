import React, { useMemo } from 'react';
import {
  Table,
  TableContainer,
} from '@mui/material';

import { CryptType } from '../../../../types/crypt_type';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../global/Spinner';
import TableBodyContentCryptInventory from './TableBodyContentCryptInventory';
import TableHeaderCryptInventory from './TableHeaderCryptInventory';
import { cryptInventoryType } from '../../../../types/inventory_type';

interface Props {
  list: cryptInventoryType[];
  handleItemToOpen: (crypt: cryptInventoryType) => void;
  updateInventory: (crypt: cryptInventoryType) => void;
}

const InventoryCryptComponent = (props: Props) => {
  const { list, handleItemToOpen, updateInventory } = props;
  const [items, setItems] = React.useState<cryptInventoryType[]>(
    list.slice(0, 20)
  );
 const [sortBy, setSortBy] = React.useState<string>('');
 const [sortOrder, setSortOrder] = React.useState<'desc' | 'asc'>('desc');
  const isElement = useMemo(() => {
    return (elem: CryptType, index: number): number => {
      return elem && items.length > 0 && elem.id === items[items.length - 1].id
        ? index
        : -1;
    };
  }, [items]);

  const createSortHandler = (key: string): void => {
      if (key === sortBy) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(key);
        setSortOrder('asc');
      }
      //By name
      if (key === 'name') {
        setItems((prev) => {
          if (prev) {
            return sortOrder === 'desc'
              ? list
                  .sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                  )
                  .slice(0, 40)
              : list
                  .sort((a, b) =>
                    b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                  )
                  .slice(0, 40);
          } else {
            return prev;
          }
        });
      }
      //by capacity
      if (key === 'capacity') {
        setItems((prev) => {
          if (prev) {
            return sortOrder === 'desc'
              ? list.sort((a, b) => a.capacity - b.capacity).slice(0, 40)
              : list.sort((a, b) => b.capacity - a.capacity).slice(0, 40);
          } else {
            return prev;
          }
        });
      }

      //by clan
      if (key === 'clan') {
        setItems((prev) => {
          if (prev) {
            return sortOrder === 'desc'
              ? list
                  .sort((a, b) =>
                    a.clans
                      .toString()
                      .toLowerCase()
                      .localeCompare(b.clans.toString().toLowerCase())
                  )
                  .slice(0, 40)
              : list
                  .sort((a, b) =>
                    b.clans
                      .toString()
                      .toLowerCase()
                      .localeCompare(a.clans.toString().toLowerCase())
                  )
                  .slice(0, 40);
          } else {
            return prev;
          }
        });
      }
    };
  
  const fetchMoreData = useMemo(() => {
    return () => {
      if (list) {
        const initItem: number | undefined = list
          .map((elem, index) => isElement(elem, index))
          .find((elem) => elem !== -1);
        if (initItem !== undefined) {
          setItems(
            items.concat([
              ...list.slice(initItem + 1, initItem ? initItem + 21 : 0 + 20),
            ])
          );
        }
      }
    };
  }, [isElement, items, list]);

  React.useEffect(() => {
    setItems(list.slice(0,20));
  }, [list]);

  if (list.length === 0) {
    return <></>;
  }

  return (
    <TableContainer
      id='InventoryCryptModal'
      sx={{ overflow: 'auto', height: '80vh' }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length !== list.length}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
        scrollableTarget='InventoryCryptModal'
        endMessage={
          <p
            style={{
              textAlign: 'center',

              marginBottom: '1em',
            }}
          >
            No more content
          </p>
        }
      >
        <Table>
          <TableHeaderCryptInventory
            sortBy={sortBy}
            sortOrder={sortOrder}
            createSortHandler={(key: string) => createSortHandler(key)}
          />
          <TableBodyContentCryptInventory
            items={items}
            handleItemToOpen={(crypt: cryptInventoryType) =>
              handleItemToOpen(crypt)
            }
            updateInventory={(crypt: cryptInventoryType) =>
              updateInventory(crypt)
            }
          />
        </Table>
        {/*  <List className='crypt__list'>
          {items.length === 0 ? (
            <Box className='span__no__result'>
              <span>No results</span>
            </Box>
          ) : (
            items.map((crypt: cryptInventoryType, index: number) => (
              <Box
                className='crypt__row'
                key={crypt.id && crypt.name && Math.random()}
              >
                <ListItem
                  key={crypt.id && crypt.name && Math.random()}
                  button
                  divider
                  dense
                  alignItems='flex-start'
                >
                  <InventoryCrypt
                    card={crypt}
                    updateInventory={(inventory: cryptInventoryType) => {
                      updateInventory(inventory);
                    }}
                  />
                  <ListItemText
                    className='list__item'
                    onClick={() => handleOpen(crypt, index)}
                    primary={getCleanedName(crypt.name)}
                    secondary={`${crypt.clans.map((clan: string) => clan)}: ${
                      crypt.group
                    }`}
                  />
                  <Box className='list__left'>
                    {getDiscIcon(crypt.disciplines).map((dis) => {
                      return (
                        <ListItemAvatar
                          className='list__avatar__icons'
                          key={crypt.id && dis}
                        >
                          <Avatar
                            sx={{ backgroundColor: 'white' }}
                            variant='rounded'
                            src={dis}
                            alt={dis}
                          />
                        </ListItemAvatar>
                      );
                    })}
                    <ListItemText
                      className='list__item__icons'
                      primary={crypt.capacity}
                    />
                  </Box>
                </ListItem>
              </Box>
            ))
          )}
        </List> */}
      </InfiniteScroll>
    </TableContainer>
  );
};

export default InventoryCryptComponent;
