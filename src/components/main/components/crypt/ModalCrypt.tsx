import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CryptType } from '../../../../types/crypt_type';
import { getClanIcon, getDiscIcon } from '../../../../util/helpFunction';
import CardButtons from '../global/CardButtons';
import './ModalCrypt';

interface CryptProp {
  openedCrypt: CryptType;
  open: boolean;
  list: CryptType[];
  cryptIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleClose: () => void;
}

const ModalCryp = (props: CryptProp) => {
  const { openedCrypt, open, list, cryptIndex, handleNext, handlePrevious, handleClose } = props;
  
  return (
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
                <CardButtons
                  handleNext={() => handleNext()}
                  handlePrevious={() => handlePrevious()}
                  list={list}
                  index={cryptIndex}
                />
              </div>
            </div>
    </Modal>
  );
};

export default ModalCryp;
 