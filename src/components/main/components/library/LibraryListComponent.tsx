import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getClanIcon,
  getDiscIcon,
  getCardTypesIcon,
  getCardCost,
} from '../../../../util';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Spinner } from '../global/Spinner';
import { CryptType } from '../../../../types/crypt_type';
import { CardType } from '../../../../types/deck_type';
import { uuidv4 } from '@firebase/util';

interface Props {
  handleItemToOpen: (library: LibraryType) => void;
  initialValue: LibraryType[];
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
    initialValue,
    deckMode,
    handleAddCardToDeck,
  } = props;

  const [items, setItems] = React.useState<LibraryType[]>([]);

  const isElement = (elem: LibraryType, index: number): number => {
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
  if (items.length === 0) {
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
          items.map((library: LibraryType) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={uuidv4()}
            >
              {deckMode ? (
                <ListItemButton
                  onClick={(e) => handleAddCardToDeck(library, 'library')}
                >
                  <AddCircleRoundedIcon />
                </ListItemButton>
              ) : null}
              <ListItem
                key={library.id}
                button
                divider
                dense
                onClick={() => handleItemToOpen(library)}
              >
                <ListItemText className='list__item' primary={library.name} />
                <Box className='list__left'>
                  {library.burn_option ? (
                    <Avatar
                      sx={{ backgroundColor: 'white' }}
                      variant='rounded'
                      src={getBurnOption()}
                      alt='Burn option'
                    />
                  ) : null}
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
                </Box>
              </ListItem>
            </Box>
          ))
        )}
      </List>
    </InfiniteScroll>
  );
};

export default LibraryListComponent;
