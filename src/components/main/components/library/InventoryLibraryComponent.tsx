import React, { useMemo } from 'react';
import { Table, TableContainer } from '@mui/material';

import InfiniteScroll from 'react-infinite-scroll-component';
import { LibraryType } from '../../../../types/library_type';
import { Spinner } from '../global/Spinner';
import TableBodyContentIventory from './TableBodyContentInventory';
import TableHeaderInventory from './TableHeaderInventory';
import { libraryInventoryType } from '../../../../types/inventory_type';

interface Props {
  list: libraryInventoryType[];
  handleItemToOpen: (library: libraryInventoryType) => void;
  updateInventory: (library: libraryInventoryType) => void;
}

const InventoryLibraryComponent = (props: Props) => {
  const { list, handleItemToOpen, updateInventory } = props;
  const [sortBy, setSortBy] = React.useState<string>('');
  const [sortOrder, setSortOrder] = React.useState<'desc' | 'asc'>('desc');
  const [items, setItems] = React.useState<libraryInventoryType[]>(
    list.slice(0, 20)
  );

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
              ...list.slice(initItem + 1, initItem ? initItem + 21 : 0 + 20),
            ])
          );
        }
      }
    };
  }, [isElement, items, list]);

  React.useEffect(() => {
    setItems(list.slice(0, 20));
  }, [list]);



  return (
    <TableContainer
      id='InventoryLibraryModal'
      sx={{ overflow: 'auto', height: '80vh' }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length !== list.length}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
        scrollableTarget='InventoryLibraryModal'
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
          <TableHeaderInventory
            sortBy={sortBy}
            sortOrder={sortOrder}
            createSortHandler={(key: string) => createSortHandler(key)}
          />
          <TableBodyContentIventory
            items={items}
            handleItemToOpen={(library: libraryInventoryType) =>
              handleItemToOpen(library)
            }
            updateInventory={(library: libraryInventoryType) =>
              updateInventory(library)
            }
          />
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default InventoryLibraryComponent;
