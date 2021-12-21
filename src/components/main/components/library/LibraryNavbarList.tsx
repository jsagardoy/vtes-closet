import { TextField } from '@material-ui/core';
import { HighlightOff, MoreVert, Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import React from 'react';
import { LibraryType } from '../../../../types/library_type';
import './LibraryNavbarList.css';

interface NavbarLibraryProps {
  searchList: (name: string) => void;
}
const NavbarLibrary = (props: NavbarLibraryProps): any => {
  const {searchList } = props;
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [inputSearch, setInputSearch] = React.useState<string>('');

  const isEvent = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ): e is React.ChangeEvent<HTMLInputElement> =>
    (e as React.ChangeEvent<HTMLInputElement>).target !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (isEvent(e)) {
      setInputSearch(e.target.value);
      searchList(e.target.value);
    } else {
      setInputSearch('');
      searchList('');
    }
  };

  const handleSearch = () => {
    setShowInput(!showInput);
  };

  React.useEffect(() => {}, []);
  return (
    <>
      <div className='navbarList'>
        <div className='navbarList__left'>
          <h3>Library</h3>
        </div>
        <div className='navbarList__right'>
          {showInput ? (
            <TextField
              autoFocus
              variant='standard'
              value={inputSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' onClick={(e) => handleChange('')}>
                      <HighlightOff />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : null}
          <IconButton size='small' onClick={() => handleSearch()}>
            <Search style={{ fill: 'darkcyan' }} />
          </IconButton>
          <IconButton size='small' /* onClick={() => handleMore()} */>
            <MoreVert style={{ fill: 'darkcyan' }} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default NavbarLibrary;
