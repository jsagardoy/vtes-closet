import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { CryptType } from '../../../../types/crypt_type';
import { LibraryType } from '../../../../types/library_type';
import './CardButton.css';
interface Props {
  handleNext: () => void;
  handlePrevious: () => void;
  list: CryptType[] | LibraryType[];
  index: number;
}
const CardButtons: React.FC<Props> = (props: Props) => {
  const { list, index, handleNext, handlePrevious } = props;

  return (
    <Box className='button__container'>
      <IconButton
        disabled={index === 0}
        size='small'
        onClick={() => handlePrevious()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            return handlePrevious();
          }
        }}
      >
        <NavigateBefore className='icon__button' />
      </IconButton>

      <IconButton
        disabled={index === list.length - 1}
        size='small'
        onClick={() => handleNext()}
      >
        <NavigateNext className='icon__button' />
      </IconButton>
    </Box>
  );
};

export default CardButtons;
