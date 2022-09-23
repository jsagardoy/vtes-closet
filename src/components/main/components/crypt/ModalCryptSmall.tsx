import '../global/CardDetail.css';

import { Box, Button, Dialog, Paper } from '@mui/material';
import {
  composeText,
  getClanIcon,
  getCleanedName,
  getDiscIcon,
} from '../../../../util/helpFunction';

import Avatar from '@mui/material/Avatar';
import CardButtons from '../global/CardButtons';
import CloseIcon from '@mui/icons-material/Close';
import { CryptType } from '../../../../types/crypt_type';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

interface CryptProp {
  openedCrypt: CryptType;
  open: boolean;
  list: CryptType[];
  cryptIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleCloseModal: () => void;
}

const ModalCryptSmall = (props: CryptProp) => {
  const {
    openedCrypt,
    open,
    list,
    cryptIndex,
    handleNext,
    handlePrevious,
    handleCloseModal,
  } = props;

  return (
    <Dialog
      id='dialog'
      fullScreen
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiDialog-container': { width: '100%' },
        '& .MuiDialog-paperFullScreen': { minHeight: '103%' },
      }}
      open={open}
      onClose={handleCloseModal}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          return handlePrevious();
        }
        if (e.key === 'ArrowRight') {
          return handleNext();
        }
      }}
    >
      <Paper
        id='paper'
        sx={{
          display: 'inline-block',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            minWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <img src={openedCrypt.url} alt={openedCrypt.name} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color='secondary' sx={{ m: '1rem' }} variant='h6'>
              {getCleanedName(openedCrypt.name)}
            </Typography>
            <Button color='secondary' onClick={() => handleCloseModal()}>
              <CloseIcon />
            </Button>
          </Box>
          <Divider />
          <Box sx={{ height: '41vh', maxHeight: '30vh', overflow: 'auto' }}>
            <Box sx={{ marginLeft: '1rem', marginBottom: '1rem' }}>
              {openedCrypt.aka ? (
                <Typography variant='h6'>{openedCrypt.aka}</Typography>
              ) : null}
              <Box sx={{ display: 'flex' }}>
                <Typography variant='subtitle1'>
                  Clan: {openedCrypt.clans.map((clan) => clan)}
                </Typography>
                {getClanIcon(openedCrypt.clans).map((clan) => (
                  <Avatar
                    sx={{ marginLeft: '.5rem' }}
                    key={clan && openedCrypt.id}
                    src={clan}
                    alt={clan}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  marginTop: '.5rem',
                  marginBottom: '.5rem',
                }}
              >
                <Typography variant='body1'>
                  Group: {openedCrypt.group}
                </Typography>
                <Typography sx={{ marginLeft: '.5rem' }} variant='body1'>
                  Capacity: {openedCrypt.capacity}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  marginTop: '.5rem',
                  marginBottom: '.5rem',
                }}
              >
                <Typography sx={{ marginRight: '1rem' }} variant='subtitle2'>
                  Disciplines:
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  {getDiscIcon(openedCrypt.disciplines).map((disc) => (
                    <Avatar
                      key={openedCrypt.id && disc}
                      src={disc}
                      alt={disc}
                    />
                  ))}
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  marginTop: '.5rem',
                  marginBottom: '.5rem',
                  marginRight: '.5rem',
                }}
              >
                <Typography variant='body1'>
                  {parse(composeText(openedCrypt.card_text))}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ m: '1rem', display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>
                Sets:
                {Object.keys(openedCrypt.sets).map((set, index) =>
                  index !== Object.keys(openedCrypt.sets).length - 1
                    ? `${set}, `
                    : `${set}.`
                )}
              </Typography>
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
        </Box>
      </Paper>
    </Dialog>
  );
};

export default ModalCryptSmall;
