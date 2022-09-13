import { Table, TableContainer } from '@mui/material';
import React, { useMemo } from 'react';
import { CryptType } from '../../../../types/crypt_type';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../global/Spinner';
import { LibraryType } from '../../../../types/library_type';
import { CardType } from '../../../../types/deck_type';
import TableHeaderCrypt from './TableHeaderCrypt';
import TableBodyContentCrypt from './TableBodyContentCrypt';
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
        </Table>
      </InfiniteScroll>
    </TableContainer>

    /* 
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
          items.map((crypt: CryptType, index: number) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }} key={crypt.id && crypt.name && Math.random()}>
              {deckMode ?
              <ListItemButton onClick={(e)=>handleAddCardToDeck(crypt,'crypt')}><AddCircleRoundedIcon /></ListItemButton>
              :null
            }
              <ListItem
                key={crypt.id && crypt.name && Math.random()}
                button
                divider
                dense
                alignItems='flex-start'
                onClick={() => handleOpen(crypt, index)}
              >
                
                <ListItemText
                  className='list__item'
                  primary={getCleanedName(crypt.name)}
                  secondary={`${crypt.clans.map((clan) => clan)}: ${
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
                        <Avatar sx={{backgroundColor:'white'}} variant='rounded' src={dis} alt={dis} />
                      </ListItemAvatar>
                    );
                  })}
                  <ListItemText
                    sx={{ marginLeft:'1rem'}}
                    className='list__item__icons'
                    primary={crypt.capacity}
                    //secondary={getDiscIcon(crypt.discipline)}
                  />
                </Box>
              </ListItem>
            </Box>
          ))
        )}
      </List>
    </InfiniteScroll> */
  );
};

export default CryptListComponent;
