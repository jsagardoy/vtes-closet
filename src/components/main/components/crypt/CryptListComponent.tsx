import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { CryptType } from '../../../../types/crypt_type';
import { getCleanedName, getDiscIcon } from '../../../../util/helpFunction';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../global/Spinner';
import { Box } from '@mui/system';
import { LibraryType } from '../../../../types/library_type';
import { CardType } from '../../../../types/deck_type';
interface Props {
  list: CryptType[];
  initialValue: CryptType[];
  handleOpen: (crypt: CryptType, index: number) => void;
  deckMode: boolean;
  handleAddCardToDeck: (card: CryptType|LibraryType, cardType:CardType) => void;
}

const CryptListComponent = (props: Props) => {
  const { list, handleOpen, initialValue, deckMode, handleAddCardToDeck } =
    props;
  //const initialValue = list.slice(0, 20);
  const [items, setItems] = React.useState<CryptType[]>([]);

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
  }, [ initialValue, list ]); 

  if (list.length === 0) {
    return <></>;
  }

  if (items.length === 0 && list.length!==0) {
    return (
      <Typography variant='subtitle2'
        sx={{
          textAlign: 'center',
          marginBottom: '1em',
        }}
      >
        No results
      </Typography>
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
    </InfiniteScroll>
  );
};

export default CryptListComponent;
