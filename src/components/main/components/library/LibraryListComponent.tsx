import {
  Avatar,
  IconButton,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getClanIcon,
  getDiscIcon,
  getCardTypesIcon,
  getCardCost,
} from '../../../../util';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { CryptType } from '../../../../types/crypt_type';
import { CardType } from '../../../../types/deck_type';
import { Spinner } from '../global/Spinner';
import React from 'react';

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
  const {
    list,
    handleItemToOpen,
    deckMode,
    handleAddCardToDeck,
  } = props;

  const [items, setItems] = React.useState<LibraryType[]>(list.slice(0, 20));
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
  const getTableHeader = () => (
    <TableHead>
      <TableRow>
        {deckMode ? <TableCell align='center'>Action</TableCell> : null}
        <TableCell align='center'>Name</TableCell>
        <TableCell align='center'>Card Type</TableCell>
        <TableCell align='center'>Burn Option</TableCell>
        <TableCell align='center'>Disciplines</TableCell>
        <TableCell align='center'>Clan</TableCell>
        <TableCell align='center'>Cost</TableCell>
      </TableRow>
    </TableHead>
  );

  const getTableBody = useMemo(
    () => () =>
      (
        <TableBody>
          {items.map((library) => (
            <TableRow key={library.id}>
              
              {deckMode ? (
                <TableCell align='center'>
                  <IconButton
                  onClick={(e) => handleAddCardToDeck(library, 'library')}
                  >
                  <AddCircleRoundedIcon />
                </IconButton>
                  </TableCell>
              ) : null}
              <TableCell align='center' onClick={()=>handleItemToOpen(library)}>
                <Typography color='secondary'>{library.name}</Typography>
              </TableCell>
              <TableCell align='center'>
                {getCardTypesIcon(library.types).map(
                  (type: string, index: number) => (
                    <ListItemAvatar
                      className='list__avatar__icons'
                      key={library.id && type}
                    >
                      <Avatar
                        sx={{ backgroundColor: 'white' }}
                        variant='rounded'
                        key={type && library.id && index}
                        src={type}
                        alt={type}
                      />
                    </ListItemAvatar>
                  )
                )}
              </TableCell>

              <TableCell align='center'>
                {library.burn_option ? (
                  <Avatar
                    sx={{ backgroundColor: 'white' }}
                    variant='rounded'
                    src={getBurnOption()}
                    alt='Burn option'
                  />
                ) : null}
              </TableCell>
              <TableCell sx={{ flexDirection: 'row' }}>
                {library.disciplines
                  ? getDiscIcon(library.disciplines).map(
                      (disc: string, index: number) => (
                        <ListItemAvatar
                          className='list__avatar__icons'
                          key={library.id && disc}
                        >
                          <Avatar
                            sx={{ backgroundColor: 'white' }}
                            variant='rounded'
                            src={disc}
                            alt={disc}
                          />
                        </ListItemAvatar>
                      )
                    )
                  : null}
              </TableCell>
              <TableCell align='center'>
                {library.clans
                  ? getClanIcon(library.clans).map(
                      (clan: string, index: number) => (
                        <ListItemAvatar
                          className='list__avatar__icons'
                          key={library.id && clan}
                        >
                          <Avatar
                            sx={{ backgroundColor: 'white' }}
                            variant='rounded'
                            key={clan && library.id && index}
                            src={clan}
                            alt={clan}
                          />
                        </ListItemAvatar>
                      )
                    )
                  : null}
              </TableCell>
              <TableCell align='center'>
                {library.blood_cost || library.pool_cost ? (
                  library.blood_cost ? (
                    <Avatar
                      sx={{ backgroundColor: 'white' }}
                      variant='rounded'
                      src={getCardCost(library.blood_cost, 'blood')}
                      alt='Blood cost'
                    />
                  ) : library.pool_cost ? (
                    <Avatar
                      sx={{ backgroundColor: 'white' }}
                      variant='rounded'
                      src={getCardCost(library.pool_cost, 'pool')}
                      alt='Pool cost'
                    />
                  ) : null
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ),
    [deckMode, handleAddCardToDeck, handleItemToOpen, items]
  );

  React.useEffect(() => {
   setItems(list.slice(0, 20));
   return (() => {});
}, [list])

  return (
    <TableContainer>
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
        <Table>
        {getTableHeader()}
          {getTableBody()}
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default LibraryListComponent;
