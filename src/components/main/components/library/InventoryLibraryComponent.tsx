import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React, { useMemo } from 'react';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getCardCost,
  getCardTypesIcon,
  getClanIcon,
  getDiscIcon,
} from '../../../../util/helpFunction';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../global/Spinner';
import InventoryLibrary from './InventoryLibrary';
import { libraryInventoryType } from '../../../../types/inventory_type';

interface Props {
  list: libraryInventoryType[];
  initialValue: libraryInventoryType[];
  handleOpen: (library: LibraryType, index: number) => void;
  updateInventory: (inventory: libraryInventoryType) => void;
}

const InventoryLibraryComponent = (props: Props) => {
  const { list, handleOpen, initialValue, updateInventory } = props;

  const [items, setItems] =
    React.useState<libraryInventoryType[]>(initialValue);

  const isElement = useMemo(() => {
    return (elem: LibraryType, index: number): number => {
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
      <List className='library__list'>
        {items.length === 0 ? (
          <div className='span__no__result'>
            <span>No results</span>
          </div>
        ) : (
          items.map((library: libraryInventoryType, index: number) => (
            <div
              className='library__row'
              key={library.id && library.name && Math.random()}
            >
              <ListItem
                key={library.id}
                button
                divider
                dense
                alignItems='flex-start'
              >
                <InventoryLibrary
                  card={library}
                  updateInventory={(inventory) => {
                    updateInventory(inventory);
                  }}
                />
                <ListItemText
                  className='list__item'
                  primary={library.name}
                  onClick={() => handleOpen(library, index)}
                />
                <div className='list__left'>
                  {library.burn_option ? (
                    <Avatar src={getBurnOption()} alt='Burn option' />
                  ) : null}
                  {library.clans
                    ? getClanIcon(library.clans).map(
                        (clan: string, index: number) => (
                          <ListItemAvatar
                            className='list__avatar__icons'
                            key={library.id && clan}
                          >
                            <Avatar
                              key={clan && library.id && index}
                              src={clan}
                              alt={clan}
                            />
                          </ListItemAvatar>
                        )
                      )
                    : null}
                  {library.disciplines
                    ? getDiscIcon(library.disciplines).map(
                        (disc: string, index: number) => (
                          <ListItemAvatar
                            className='list__avatar__icons'
                            key={library.id && disc}
                          >
                            <Avatar src={disc} alt={disc} />
                          </ListItemAvatar>
                        )
                      )
                    : null}

                  {getCardTypesIcon(library.types).map(
                    (type: string, index: number) => (
                      <ListItemAvatar
                        className='list__avatar__icons'
                        key={library.id && type}
                      >
                        <Avatar
                          key={type && library.id && index}
                          src={type}
                          alt={type}
                        />
                      </ListItemAvatar>
                    )
                  )}
                  {library.blood_cost || library.pool_cost ? (
                    library.blood_cost ? (
                      <Avatar
                        src={getCardCost(library.blood_cost, 'blood')}
                        alt='Blood cost'
                      />
                    ) : library.pool_cost ? (
                      <Avatar
                        src={getCardCost(library.pool_cost, 'pool')}
                        alt='Pool cost'
                      />
                    ) : null
                  ) : null}
                </div>
              </ListItem>
            </div>
          ))
        )}
      </List>
    </InfiniteScroll>
  );
};

export default InventoryLibraryComponent;
