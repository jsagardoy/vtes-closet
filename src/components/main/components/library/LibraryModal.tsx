import { Button, Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import React from 'react';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getCardCost,
  getCardTypesIcon,
  getClanIcon,
  getDiscIcon,
} from '../../../../util';
import CardButtons from '../global/CardButtons';
import './LibraryModal.css';

interface LibraryModalProps {
  open: boolean;
  library: LibraryType;
  list: LibraryType[];
  index: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleCloseModal: () => void;
}

const LibraryModal = (props: LibraryModalProps) => {
  const {
    library,
    open,
    list,
    index,
    handleCloseModal,
    handleNext,
    handlePrevious,
  } = props;

  const composeLink = (t: string, links: any): string => {
    const ref = getLinkText(t);
    return links[ref];
  };
  const getLinkText = (t: string): any => t.substring(t.indexOf('['));

  const linkText = (t: string): string => {
    return t.substring(0, t.indexOf('['));
  };

  return (
    <Modal className='modal' open={open} onClose={handleCloseModal}>
      <Box className='modal__content'>
        <img src={library.url} alt={library.name} />
        <div className='modal__right'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Button onClick={() => handleCloseModal()}>
              <CloseIcon style={{ color: 'darkcyan' }} />
            </Button>
          </div>
          <div className='modal__right__text'>
            <div className='modal__right__top'>
              <Typography variant='h6' className='title'>
                {library.name}
              </Typography>
            </div>
            <div className='card__data'>
              {library.types ? (
                <div className='card__type'>
                  <Typography variant='subtitle2'>Card type:</Typography>
                  {getCardTypesIcon(library.types).map(
                    (type: string, index) => (
                      <Avatar
                        key={library.id.toString().concat(index.toString())}
                        src={type}
                        alt={type}
                      />
                    )
                  )}
                </div>
              ) : (
                <></>
              )}
              {library.burn_option ? (
                <Avatar src={getBurnOption()} alt='Burn option' />
              ) : (
                <></>
              )}
              {library.clans ? (
                <div className='clan__data'>
                  <Typography variant='subtitle2'>Clan:</Typography>
                  {getClanIcon(library.clans).map((clan, index) => (
                    <Avatar
                      key={clan.concat(library.id.toString(), index.toString())}
                      src={clan}
                      alt={clan}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
              {library.disciplines ? (
                <div className='disc'>
                  <Typography variant='subtitle2'>Disciplines:</Typography>
                  {getDiscIcon(library.disciplines).map(
                    (disc: string, index: number) => (
                      <Avatar
                        key={disc.concat(
                          library.id.toString(),
                          index.toString(),
                          disc
                        )}
                        src={disc}
                        alt={disc}
                      />
                    )
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className='cost'>
                {library.blood_cost || library.pool_cost ? (
                  <Typography
                    sx={{ display: 'flex', flexDirection: 'row' }}
                    variant='subtitle2'
                  >
                    Card cost:
                  </Typography>
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
              </div>
            </div>
            <Divider sx={{ margin: '1px' }} />
            <Typography variant='subtitle2'>{library.card_text}</Typography>
            <Divider />
            <div className='artist'>
              <Typography variant='subtitle2'>Artists: </Typography>
              <Typography variant='subtitle2'>
                {library.artists.map((a: string, index: number) =>
                  index === library.artists.length - 1 ? a : `${a}, `
                )}
              </Typography>
            </div>
            <Divider />

            {library.rulings ? (
              <>
                <Typography variant='subtitle2'>Rulings:</Typography>

                {library.rulings.text.map((t, index) => (
                  <div key={index} className='ruling'>
                    <Typography variant='subtitle2'>{linkText(t)}</Typography>
                    <Link
                      variant='subtitle2'
                      href={composeLink(t, library.rulings?.links)}
                    >
                      {getLinkText(t)}
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <CardButtons
            handleNext={() => handleNext()}
            handlePrevious={() => handlePrevious()}
            list={list}
            index={index}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default LibraryModal;
