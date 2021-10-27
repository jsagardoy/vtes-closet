import React from 'react';
import { MoreVert, Search } from '@material-ui/icons';
import './NavbarList.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { CryptType } from '../../types/crypt_type';
import TextField from '@mui/material/TextField/TextField';

interface NavbarListProps {
  cardType: string;
  list: CryptType[];
  searchList: (condition: string) => void;
}

const NavbarList = (props: NavbarListProps) => {
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showInput, setShowInput] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    searchList(e.target.value);
  };
  const handleSearch = () => {
    setShowInput(!showInput);
  };

  React.useEffect(() => {}, []);

  const { cardType, searchList } = props;
  return (
    <div className='navbarList'>
      <div className='navbarList__left'>
        <h3>{cardType}</h3>
      </div>
      <div className='navbarList__right'>
        {showInput ? (
          <TextField
            autoFocus
            variant='standard'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        ) : null}
        <IconButton size='small' onClick={() => handleSearch()}>
          <Search style={{ fill: 'darkcyan' }} />
        </IconButton>
        <IconButton size='small'>
          <MoreVert style={{ fill: 'darkcyan' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default NavbarList;
