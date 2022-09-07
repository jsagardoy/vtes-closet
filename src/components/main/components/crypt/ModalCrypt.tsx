import { Box, Button, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CryptType } from '../../../../types/crypt_type';
import {
  composeText,
  getClanIcon,
  getDiscIcon,
} from '../../../../util/helpFunction';
import CardButtons from '../global/CardButtons';
import CloseIcon from '@mui/icons-material/Close';
import parse from 'html-react-parser';
import '../global/CardDetail.css';

interface CryptProp {
  openedCrypt: CryptType;
  open: boolean;
  list: CryptType[];
  cryptIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleClose: () => void;
}

const ModalCrypt = (props: CryptProp) => {
  const {
    openedCrypt,
    open,
    list,
    cryptIndex,
    handleNext,
    handlePrevious,
    handleClose,
  } = props;

  return (
    <Modal
      className='modal'
      open={open}
      onClose={handleClose}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          return handlePrevious();
        }
        if (e.key === 'ArrowRight') {
          return handleNext();
        }
      }}
    >
      <Box className='modal__content'>
        <img
          className='modal__main__img'
          src={openedCrypt.url}
          alt={openedCrypt.name}
        />
        <Paper className='modal__right'>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Button onClick={() => handleClose()}>
              <CloseIcon style={{}} />
            </Button>
          </Box>
          <Box className='modal__right__text'>
            <Box className='modal__right__top'>
              <Typography variant='h6' className='title'>
                {openedCrypt.name} {openedCrypt.aka}
              </Typography>
              <Box className='clan'>
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
              </Box>
              <Typography variant='subtitle2'>
                Group: {openedCrypt.group}
              </Typography>
              <Typography variant='subtitle2'>
                Capacity: {openedCrypt.capacity}
              </Typography>
              <Divider />
              <Typography variant='subtitle2'>Disciplines:</Typography>
              <Box className='disc__content'>
                {getDiscIcon(openedCrypt.disciplines).map((disc) => (
                  <Avatar
                    key={openedCrypt.id && disc}
                    className='avatar__disciplines__icons'
                    src={disc}
                    alt={disc}
                  />
                ))}
              </Box>
              <Divider />
              <Box className='card__text'>
                <Typography variant='subtitle2'>
                  {parse(composeText(openedCrypt.card_text))}
                </Typography>
              </Box>
            </Box>
            <Box className='modal__right__bottom'>
              <Divider />
              <Typography variant='caption'>
                Sets:
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
            </Box>
          </Box>
          <CardButtons
            handleNext={() => handleNext()}
            handlePrevious={() => handlePrevious()}
            list={list}
            index={cryptIndex}
          />
        </Paper>
      </Box>
    </Modal>
  );
};

export default ModalCrypt;
