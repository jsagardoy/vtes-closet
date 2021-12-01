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
import './CryptList.css';
import { CryptType } from '../../../types/crypt_type';
import { getDiscIcon, getClanIcon } from '../../../util';
import Divider from '@mui/material/Divider/Divider';
import IconButton from '@mui/material/IconButton/IconButton';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

interface listProps {
  list: CryptType[]; //habrá que hacer también la opción para las cartas de librería
}

const CryptList = (props: listProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCrypt, setOpenedCrypt] = React.useState<CryptType>();
  const [cryptIndex, setCryptIndex] = React.useState<number>(0);

  const { list } = props;

  const handleOpen = (crypt: CryptType, index: number) => {
    setOpenedCrypt(crypt);
    setOpen(true);
    setCryptIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedCrypt(undefined);
  };

  const handleNext = () => {
    const newIndex: number = cryptIndex + 1;
    const crypt: CryptType = list[newIndex];
    handleOpen(crypt, newIndex);
  };
  const handlePrevious = () => {
    const newIndex: number = cryptIndex - 1;
    const crypt: CryptType = list[newIndex];
    handleOpen(crypt, newIndex);
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
                <div className='modal__right__text'>
                  <div className='modal__right__top'>
                    <Typography variant='h6' className='title'>
                      {openedCrypt.name} {openedCrypt.aka}
                    </Typography>
                    <div className='clan'>
                      <Typography variant='subtitle1'>
                        {openedCrypt.clans.map((clan) => clan)}
                      </Typography>
                      {getClanIcon(openedCrypt.clans).map((clan) => (
                        <Avatar
                          className='clan__avatar__icon'
                          key={clan && openedCrypt.id}
                          src={clan}
                          alt={clan}
                        />
                      ))}
                    </div>
                    <Typography variant='subtitle2'>
                      Group: {openedCrypt.group}
                    </Typography>
                    <Typography variant='subtitle2'>
                      Capacity: {openedCrypt.capacity}
                    </Typography>
                    <Divider />
                    <Typography variant='subtitle2'>Disciplines:</Typography>
                    <div className='disc__content'>
                      {getDiscIcon(openedCrypt.disciplines).map((disc) => (
                        <Avatar
                          key={openedCrypt.id && disc}
                          className='avatar__disciplines__icons'
                          src={disc}
                          alt={disc}
                        />
                      ))}
                    </div>
                    <Divider />
                    <Typography variant='body2'>
                      {openedCrypt.card_text}
                    </Typography>
                  </div>
                  <div className='modal__right__bottom'>
                    <Divider />
                    <Typography variant='caption'>
                      Sets:{' '}
                      {Object.keys(openedCrypt.sets).map((set, index) =>
                        index !== Object.keys(openedCrypt.sets).length - 1
                          ? `${set}, `
                          : `${set}.`
                      )}
                    </Typography>
                    <Divider />
                    <Typography variant='caption'>
                      Artists: {openedCrypt.artists}
                    </Typography>
                  </div>
                </div>

                <div className='button__container'>
                  <IconButton
                    disabled={cryptIndex === 0}
                    size='small'
                    onClick={() => handlePrevious()}
                  >
                    <NavigateBefore className='icon__button' />
                  </IconButton>
                  <IconButton
                    disabled={cryptIndex === list.length - 1}
                    size='small'
                    onClick={() => handleNext()}
                  >
                    <NavigateNext className='icon__button' />
                  </IconButton>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      ) : null}
      <List className='crypt__list'>
        {list.length === 0 ? (
          <div className='span__no__result'>
            <span>No results</span>
          </div>
        ) : (
          list.map((crypt: CryptType, index: number) => (
            <div key={crypt.id}>
              <ListItem
                key={crypt.id}
                button
                divider
                dense
                alignItems='flex-start'
                onClick={() => handleOpen(crypt, index)}
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

export default CryptList;