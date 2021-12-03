import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { LibraryType } from '../../../../types/library_type';
import { getBurnOption, getCardCost } from '../../../../util';
import './LibraryModal';

interface LibraryModalProps {
  show: boolean;
  library: LibraryType;
  handleCloseModal: () => void;
}

const LibraryModal = (props: LibraryModalProps) => {
  const { library, show, handleCloseModal } = props;
  const [open, setOpen] = React.useState<boolean>(show);

  return show ? (
    <Modal className='modal' open onClose={handleCloseModal}>
      <Box className='modal__content'>
        <img src={library.url} alt={library.name} />
        <div className='modal__right'>
          <div className='modal__right__text'>
            <div className='modal__right__top'>
              <Typography variant='h6' className='title'>
                {library.name}
              </Typography>
            </div>
            {library.types ? (
              <Typography variant='subtitle2'>
                Card type: {library.types.map((type) => type)}
              </Typography>
            ) : (
              <></>
            )}
            {library.burn_option ? (
             <Avatar src={getBurnOption()} alt='Burn option'/>
            ) : (
              <></>
            )}
            {library.clans ? (
              <Typography variant='subtitle2'>
                Clan: {library.clans.map((clan) => clan)}
              </Typography>
            ) : (
              <></>
            )}
            {library.disciplines ? (
              <Typography variant='subtitle2'>
                Disciplines
                {library.disciplines.map((disc) => disc)}
              </Typography>
            ) : (
              <></>
            )}
            {library.blood_cost || library.pool_cost ? (
              <Typography variant='subtitle2'>Card cost:</Typography>
            ) : (
              <></>
            )}
            {library.blood_cost ? (
              <Avatar
                src={getCardCost(library.blood_cost, 'blood')}
                alt='Blood cost'
              />
            ) : library.pool_cost ? (
              <Avatar
                src={getCardCost(library.pool_cost, 'pool')}
                alt='Pool cost'
              />
            ) : (
              <></>
            )}
            <Divider />
            <Typography variant='subtitle2'>{library.card_text}</Typography>
            <Divider />
            <Typography variant='subtitle2'>
              Artists:{' '}
              {library.artists.map((a: string, index: number) =>
                index === library.artists.length-1 ? a : `${a}, `
              )}
            </Typography>
          </div>
        </div>
      </Box>
    </Modal>
  ) : (
    <></>
  );
};

export default LibraryModal;
