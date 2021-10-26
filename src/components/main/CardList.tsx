import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Modal,
  Typography,
} from '@material-ui/core';
import './CardList.css';
import { CryptType } from '../../types/crypt_type';
import { getDiscIcon, getClanIcon } from '../../util';

interface listProps {
  cardType: string; //library/crypt
  list: CryptType[]; //habrá que hacer también la opción para las cartas de librería
}

const CryptCardList = (props: listProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCrypt, setOpenedCrypt] = React.useState<CryptType>();

  const { list, cardType } = props;

  const handleOpen = (crypt: CryptType) => {
    setOpenedCrypt(crypt);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedCrypt(undefined);
  };

  React.useEffect(() => {}, []);
  return (
    <>
      {open && openedCrypt ? (
        <div className=''>
          <Modal className='modal' open={open} onClose={handleClose}>
            <div className='modal__content'>
              <img src={openedCrypt.url} alt='card' />
              <div className='modal__right'>
                <Typography variant='h6'>
                  {openedCrypt.name} {openedCrypt.aka}
                </Typography>
                <div className='clan'>
                <Typography variant='subtitle1'>
                  {openedCrypt.clans.map((clan) => clan)}
                </Typography>
                {getClanIcon(openedCrypt.clans).map((clan) => (
                  <Avatar className = 'clan__avatar__icon' key={clan&&openedCrypt.id} src={clan} alt={clan}/>
                ))}
                </div>
                <Typography variant='subtitle2'>
                  Group: {openedCrypt.group}
                </Typography>
                <Typography variant='subtitle2'>
                  Capacity: {openedCrypt.capacity}
                </Typography>
                <Typography variant='subtitle2'>Disciplines:</Typography>
                <div className='disc__content'>
                  {getDiscIcon(openedCrypt.disciplines).map((disc) => (
                    <Avatar
                      className='avatar__disciplines__icons'
                      src={disc}
                      alt={disc}
                    />
                  ))}
                </div>
                <br />
                <Typography variant='body2'>{openedCrypt.card_text}</Typography>
                <br />
                <Typography variant='caption'>
                  Sets: {JSON.stringify(openedCrypt.sets, null, 2)}
                </Typography>
                <br />
                <Typography variant='caption'>
                  Artists: {openedCrypt.artists}
                </Typography>
              </div>
            </div>
          </Modal>
        </div>
      ) : null}
      <List className='list'>
        {cardType === 'Library' ? (
          <ListItem button divider dense alignItems='flex-start'>
            <ListItemText className={'listItemText'} />
          </ListItem>
        ) : (
          list.map((crypt: CryptType) => (
            <div key={crypt.id}>
              <ListItem
                key={crypt.id}
                button
                divider
                dense
                alignItems='flex-start'
                onClick={() => handleOpen(crypt)}
              >
                <ListItemText
                  className='list__item'
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
    </>
  );
};

export default CryptCardList;
