 import { Modal, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import { CryptType } from '../../../../types/crypt_type';
import './ModalCrypt';

interface CryptProp {
  crypt: CryptType;
  show: boolean;
}

const ModalCryp = (prop: CryptProp) => {
/*
  React.useEffect(() => { }, []);
  const { crypt, show } = prop;
  const [open, setOpen] = React.useState(show);
  const handleClose = () => setOpen(false);
  return (
    <Modal className='modal' open={open} onClose={handleClose}>
      <Box className='box'>
        <img src={crypt.url} alt='card' />
        <Typography variant='h3'>
          {crypt.name} {crypt.aka}
        </Typography>
        <Typography variant='h6'>{crypt.clans.map((clan) => clan)}</Typography>
        <Typography variant='h6'>Group: {crypt.group}</Typography>
        <Typography variant='h6'>Capacity: {crypt.capacity}</Typography>
        <Typography variant='h6'>Disciplines: {crypt.disciplines}</Typography>
        <Typography variant='h6'>{crypt.card_text}</Typography>
        <Typography variant='h6'>{JSON.stringify(crypt.sets)}</Typography>
      </Box>
    </Modal>
  );*/
};

export default ModalCryp;
 