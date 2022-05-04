import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { CryptType } from '../../../../types/crypt_type';
import { getDiscIcon } from '../../../../util/helpFunction';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../global/Spinner';
import Inventory from '../global/Inventory';
import { typeCryptInventory } from '../../../../types/inventory_type';

interface Props {
  list: typeCryptInventory[];
  initialValue: typeCryptInventory[];
  handleOpen: (crypt: CryptType, index: number) => void;
}

const CryptListComponent = (props: Props) => {
  const { list, handleOpen, initialValue } = props;
  //const initialValue = list.slice(0, 20);
  const [items, setItems] = React.useState<typeCryptInventory[]>([]);

  const isElement = (elem: CryptType, index: number): number => {
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

  if (items.length === 0 && list.length !== 0) {
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
          items.map((crypt: typeCryptInventory, index: number) => (
            <div
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
                <Inventory
                  card={crypt}
                />
                <ListItemText
                  className='list__item'
                  onClick={() => handleOpen(crypt, index)}
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
    </InfiniteScroll>
  );
};

export default CryptListComponent;
