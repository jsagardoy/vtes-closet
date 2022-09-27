import '../global/CardDetail.css';

import { AvatarGroup, Button, Dialog, Paper } from '@mui/material';
import {
  composeText,
  getBurnOption,
  getCardCost,
  getCardTypesIcon,
  getClanIcon,
  getDiscIcon,
} from '../../../../util';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardButtons from '../global/CardButtons';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { LibraryType } from '../../../../types/library_type';
import Link from '@mui/material/Link';
import React from 'react';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import { uuidv4 } from '@firebase/util';

interface LibraryModalProps {
  open: boolean;
  library: LibraryType;
  list: LibraryType[];
  index: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleCloseModal: () => void;
}

const LibraryModalSmall = (props: LibraryModalProps) => {
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
    <Dialog
      fullScreen
      sx={{
        display: 'flex',
        displayDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiDialog-paperFullScreen': { minHeight: '100%',maxHeight:'100%' },
      }}
      PaperProps={{
        sx: {
        },
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
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          id='image'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <img src={library.url} alt={library.name} />
        </Box>

        <Box
          id='content'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            id='data_right'
            sx={{
              display: 'flex',
              alignItems: 'space-between',
              flexDirection: 'column',
            }}
          >
            <Box
              id='name_close'
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography color='secondary' sx={{ m: '1rem' }} variant='h6'>
                {library.name}
              </Typography>
              <Button color='secondary' onClick={() => handleCloseModal()}>
                <CloseIcon />
              </Button>
            </Box>
            <Divider />
            <Box
              id='data_content'
              sx={{ height: '41vh', maxHeight: '30vh', overflow: 'auto' }}
            >
              <Box sx={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                {library.types ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Typography
                      sx={{ marginRight: '1rem' }}
                      variant='subtitle2'
                    >
                      Card type:
                    </Typography>
                    {getCardTypesIcon(library.types).map(
                      (type: string, index) => (
                        <Avatar
                          variant='rounded'
                          sx={{ backgroundColor: 'white' }}
                          key={library.id.toString().concat(index.toString())}
                          src={type}
                          alt={type}
                        />
                      )
                    )}
                  </Box>
                ) : null}
                {library.burn_option ? (
                  <Avatar
                    variant='rounded'
                    sx={{ backgroundColor: 'white' }}
                    src={getBurnOption()}
                    alt='Burn option'
                  />
                ) : null}
                {library.clans ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Typography
                      sx={{ marginRight: '1rem' }}
                      variant='subtitle2'
                    >
                      Clan:
                    </Typography>
                    {getClanIcon(library.clans).map((clan, index) => (
                      <Avatar
                        variant='rounded'
                        sx={{ backgroundColor: 'white', display: 'flex' }}
                        key={clan.concat(
                          library.id.toString(),
                          index.toString()
                        )}
                        src={clan}
                        alt={clan}
                      />
                    ))}
                  </Box>
                ) : null}
                {library.disciplines ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Typography
                      sx={{ marginRight: '1rem' }}
                      variant='subtitle2'
                    >
                      Disciplines:
                    </Typography>
                    {getDiscIcon(library.disciplines).map(
                      (disc: string, index: number) => (
                        <AvatarGroup
                          key={uuidv4()}
                          sx={{ display: 'flex', gap: '1rem' }}
                        >
                          <Avatar
                            variant='rounded'
                            sx={{ backgroundColor: 'white' }}
                            src={disc}
                            alt={disc}
                          />
                        </AvatarGroup>
                      )
                    )}
                  </Box>
                ) : null}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {library.blood_cost || library.pool_cost ? (
                    <Typography
                      sx={{
                        marginRight: '1rem',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      variant='subtitle2'
                    >
                      Card cost:
                    </Typography>
                  ) : null}
                  {library.blood_cost ? (
                    <Avatar
                      variant='rounded'
                      sx={{ backgroundColor: 'white' }}
                      src={getCardCost(library.blood_cost, 'blood')}
                      alt='Blood cost'
                    />
                  ) : library.pool_cost ? (
                    <Avatar
                      variant='rounded'
                      sx={{ backgroundColor: 'white' }}
                      src={getCardCost(library.pool_cost, 'pool')}
                      alt='Pool cost'
                    />
                  ) : null}
                </Box>
              </Box>
              <Divider />
              <Box sx={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                <Typography paragraph variant='body1'>
                  {parse(composeText(library.card_text))}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  marginLeft: '1rem',
                  marginBottom: '1rem',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ marginRight: '0.5rem' }} variant='body1'>
                  Artists:
                </Typography>
                <Typography variant='body1'>
                  {library.artists.map((a: string, index: number) =>
                    index === library.artists.length - 1 ? a : `${a}, `
                  )}
                </Typography>
              </Box>
              <Divider />
              {library.rulings ? (
                <Box sx={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <Typography variant='body1'>Rulings:</Typography>

                  {library.rulings.text.map((t, index) => (
                    <Box key={index}>
                      <Typography variant='body1'> - {linkText(t)}</Typography>
                      <Link href={composeLink(t, library.rulings?.links)}>
                        {getLinkText(t)}
                      </Link>
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
          <CardButtons
            handleNext={() => handleNext()}
            handlePrevious={() => handlePrevious()}
            list={list}
            index={index}
          />
        </Box>
      </Paper>
    </Dialog>
  );
};

export default LibraryModalSmall;
