import React, { useMemo } from 'react';
import { Table, TableContainer, Theme, useMediaQuery, useTheme } from '@mui/material';

import { CardType } from '../../../../types/deck_type';
import { CryptType } from '../../../../types/crypt_type';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LibraryType } from '../../../../types/library_type';
import { Spinner } from '../global/Spinner';
import TableBodyContentCrypt from './TableBodyContentCrypt';
import TableBodyContentCryptSmall from './TableBodyContentCryptSmall';
import TableHeaderCrypt from './TableHeaderCrypt';
import TableHeaderCryptSmall from './TableHeaderCryptSmall';

interface Props {
  list: CryptType[];
  deckMode: boolean;
  handleItemToOpen: (crypt: CryptType ) => void;
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
}

const CryptListComponent = (props: Props) => {
  const { list, deckMode, handleAddCardToDeck, handleItemToOpen } = props;
  const [items, setItems] = React.useState<CryptType[]>(list.slice(0, 40));
  const [sortBy, setSortBy] = React.useState<string>('');
  const [sortOrder, setSortOrder] = React.useState<'desc' | 'asc'>('desc');

  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      if (initItem !== undefined) {
        setItems(
          items.concat([
            ...list.slice(initItem + 1, initItem ? initItem + 41 : 0 + 40),
          ])
        );
      }
    }
  };
}, [isElement, items, list]);

  React.useEffect(() => {
    setItems(list.slice(0, 40));
  }, [list]);

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
      })

    }
    //by capacity
    if (key === 'capacity') {
      setItems((prev) => {
        if (prev) {
          return sortOrder === 'desc'
            ? list
              .sort((a, b) =>
                a.capacity - b.capacity
              ).slice(0, 40)
            : list
              .sort((a, b) =>
                b.capacity - a.capacity
              )
              .slice(0, 40);
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
                a.clans.toString().toLowerCase().localeCompare(b.clans.toString().toLowerCase())
              ).slice(0, 40)
            : list
              .sort((a, b) =>
                b.clans.toString().toLowerCase().localeCompare(a.clans.toString().toLowerCase())
              )
              .slice(0, 40);
        } else {
          return prev;
        }
      });
    }
  }

  return (
    <TableContainer
      id='DeckCryptModal'
      sx={{ overflow: 'auto', height: '80vh' }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < list.length}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
        scrollableTarget='DeckCryptModal'
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
          {isMobile ? (
            <>
              <TableHeaderCryptSmall
                deckMode={deckMode}
                sortBy={sortBy}
                sortOrder={sortOrder}
                createSortHandler={createSortHandler}
              />
              <TableBodyContentCryptSmall
                deckMode={deckMode}
                items={items}
                handleAddCardToDeck={handleAddCardToDeck}
                handleItemToOpen={handleItemToOpen}
              />
            </>
          ) : (
            <>
              <TableHeaderCrypt
                deckMode={deckMode}
                sortBy={sortBy}
                sortOrder={sortOrder}
                createSortHandler={createSortHandler}
              />
              <TableBodyContentCrypt
                deckMode={deckMode}
                items={items}
                handleAddCardToDeck={handleAddCardToDeck}
                handleItemToOpen={handleItemToOpen}
              />
            </>
          )}
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default CryptListComponent;
