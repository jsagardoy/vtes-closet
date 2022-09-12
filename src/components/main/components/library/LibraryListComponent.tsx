import { Table, TableContainer } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';
import { LibraryType } from '../../../../types/library_type';
import { CryptType } from '../../../../types/crypt_type';
import { CardType } from '../../../../types/deck_type';
import { Spinner } from '../global/Spinner';
import React from 'react';
import TableHeader from './TableHeader';
import TableBodyContent from './TableBodyContent';

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

  const isElement = useMemo(() => {
    return (elem: LibraryType, index: number): number => {
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
    //ahora ordenar
    if (key === 'name') {
      setItems((prev) => {
        if (prev) {
          return sortOrder === 'desc'
            ? prev.sort((a, b) => a.name.localeCompare(b.name))
            : prev.sort((a, b) => b.name.localeCompare(a.name));
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
      if (initItem!==undefined) {
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
    <TableContainer id='DeckLibraryModal' sx={{ overflow: 'auto', height: '80vh' }}>
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
        <Table >
          <TableHeader deckMode={deckMode} />
          <TableBodyContent
            deckMode={deckMode}
            items={items}
            handleAddCardToDeck={handleAddCardToDeck}
            handleItemToOpen={handleItemToOpen}
          />
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default LibraryListComponent;
