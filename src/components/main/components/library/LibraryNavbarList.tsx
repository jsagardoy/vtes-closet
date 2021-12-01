import { TextField } from '@material-ui/core';
import { HighlightOff, MoreVert, Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import React from 'react'
import {LibraryType } from '../../../../types/library_type';
import './LibraryNavbarList.css';
    
interface NavbarLibraryProps {
    list: LibraryType[] 
}
const NavbarLibrary = (props: NavbarLibraryProps): any => {
    const { list } = props;
    const [showInput, setShowInput] = React.useState<boolean>(false);

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
          { showInput ? (
            <TextField
              autoFocus
              variant='standard'
              value={0/* inputSearch */}
              /* onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e) 
              }*/
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' /* onClick={(e) => handleChange('')} */>
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
    )
}

export default NavbarLibrary;
