import {
  Table,
  TableContainer,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { CardType } from '../../../../types/deck_type';
import { CryptType } from '../../../../types/crypt_type';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LibraryType } from '../../../../types/library_type';
import React from 'react';
import { Spinner } from '../global/Spinner';
import TableBodyContent from './TableBodyContent';
import TableBodyContentSmall from './TableBodyContentSmall';
import TableHeader from './TableHeader';
import { useMemo } from 'react';

interface Props {
  handleItemToOpen: (library: LibraryType) => void;
  list: LibraryType[];
  deckMode: boolean;
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
}

const LibraryListComponent = (props: Props) => {
  const { list, handleItemToOpen, deckMode, handleAddCardToDeck } = props;

  const [items, setItems] = React.useState<LibraryType[]>(list.slice(0, 40));
  const [sortBy, setSortBy] = React.useState<string>('');
  const [sortOrder, setSortOrder] = React.useState<'desc' | 'asc'>('desc');

  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const createSortHandler = (key: string): void => {
    if (key === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
    //ahora ordenar
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
  };

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

  return (
    <TableContainer
      id='DeckLibraryModal'
      sx={{ overflow: 'auto', height: '80vh' }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < list.length}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
        scrollableTarget='DeckLibraryModal'
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
          {isMobile ? null : (
            <TableHeader
              deckMode={deckMode}
              sortBy={sortBy}
              sortOrder={sortOrder}
              createSortHandler={createSortHandler}
            />
          )}
          {isMobile ? (
            <TableBodyContentSmall
              deckMode={deckMode}
              items={items}
              handleAddCardToDeck={handleAddCardToDeck}
              handleItemToOpen={handleItemToOpen}
            />
          ) : (
            <TableBodyContent
              deckMode={deckMode}
              items={items}
              handleAddCardToDeck={handleAddCardToDeck}
              handleItemToOpen={handleItemToOpen}
            />
          )}
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default LibraryListComponent;
