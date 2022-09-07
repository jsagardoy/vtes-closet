import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React, { useMemo } from 'react';
import { CryptType } from '../../../../types/crypt_type';
import { getCleanedName, getDiscIcon } from '../../../../util/helpFunction';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../global/Spinner';
import { cryptInventoryType } from '../../../../types/inventory_type';
import InventoryCrypt from './InventoryCrypt';

interface Props {
  list: cryptInventoryType[];
  initialValue: cryptInventoryType[];
  handleOpen: (crypt: CryptType, index: number) => void;
  updateInventory: (inventory: cryptInventoryType) => void;
}

const InventoryCryptComponent = (props: Props) => {
  const { list, handleOpen, initialValue, updateInventory } = props;
  const [items, setItems] = React.useState<cryptInventoryType[]>(initialValue);

  const isElement = useMemo(() => {
    return (elem: CryptType, index: number): number => {
      return elem && items.length > 0 && elem.id === items[items.length - 1].id
        ? index
        : -1;
    };
  }, [items]);

  const fetchMoreData = useMemo(() => {
    return () => {
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
  }, [isElement, items, list]);

  React.useEffect(() => {
    setItems(initialValue);
  }, [list, initialValue]);

  if (list.length === 0) {
    return <></>;
  }

  if (items.length === 0 && list.length !== 0) {
    return (
      <p
        style={{
          textAlign: 'center',

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

            marginBottom: '1em',
          }}
        >
          No more content
        </p>
      }
    >
      <List className='crypt__list'>
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
      </List>
    </InfiniteScroll>
  );
};

export default InventoryCryptComponent;
