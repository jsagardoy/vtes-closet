import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
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
  useEffect(() => {

  }, [])
  const { list, index, handleNext, handlePrevious } = props;

  return (
    <div className='button__container'>
      <IconButton
        disabled={index === 0}
        size='small'
        onClick={() => handlePrevious()}
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
    </div>
  );
};

export default CardButtons;
