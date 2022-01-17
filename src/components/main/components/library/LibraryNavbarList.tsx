import { TextField } from '@material-ui/core';
import { HighlightOff, MoreVert, Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import React from 'react';
import { discType } from '../../../../types/crypt_type';
import { LibraryType } from '../../../../types/library_type';
import { getDiscInf, getDiscList } from '../../../../util';
import './LibraryNavbarList.css';
import LibraryNavbarModal from './LibraryNavbarModal';

interface NavbarLibraryProps {
  list: LibraryType[];
  searchList: (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string
  ) => void;
}

const values: number[] = getDiscInf().map(() => 0);
let aux: discType = { name: getDiscInf(), value: values };

const NavbarLibrary = (props: NavbarLibraryProps): any => {
  const { searchList } = props;
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const [selectedLibraryCardType, setSelectedLibraryCardType] =
    React.useState<string>('Any');
  const [selected_discList, setSelected_discList] =
    React.useState<discType>(aux);

  const [selectedDisc, setSelectedDisc] = React.useState<string[]>([]);
  const [selectedClan, setSelectedClan] = React.useState<string>('');
  const [selectedSect, setSelectedSect] = React.useState<string>('');
  const handleMore = (): void => {
    setShowMore(!showMore);
  };
  const handleFilterDisc = () => {
    const disc_list: string[] = getDiscList(selected_discList);
    searchList(
      inputSearch,
      disc_list,
      selectedLibraryCardType,
      selectedClan,
      selectedSect
    );
  };

  const handleClan = (event: SelectChangeEvent) => {
    setSelectedClan(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedLibraryCardType,
      event.target.value,
      selectedSect
    );
  };

  const handleSect = (event: SelectChangeEvent) => {
    setSelectedSect(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedLibraryCardType,
      selectedClan,
      event.target.value
    );
  };
  const isEvent = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ): e is React.ChangeEvent<HTMLInputElement> =>
    (e as React.ChangeEvent<HTMLInputElement>).target !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (isEvent(e)) {
      setInputSearch(e.target.value);
      searchList(
        e.target.value,
        getDiscList(selected_discList),
        selectedLibraryCardType,
        selectedClan,
        selectedSect
      );
    } else {
      setInputSearch('');
      searchList(
        '',
        getDiscList(selected_discList),
        selectedLibraryCardType,
        selectedClan,
        selectedSect
      );
    }
  };
  const handleSelectDisc = (index: number) => {
    let value: number = selected_discList.value[index];
    let aux: discType = { ...selected_discList };
    value === 1 ? (aux.value[index] = 0) : (aux.value[index] = value + 1);
    setSelected_discList(aux);
    handleFilterDisc();
  };
  const handleSearch = () => {
    setShowInput(!showInput);
  };

  const handleChangeLibraryCardType = (event: SelectChangeEvent) => {
    setSelectedLibraryCardType(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      event.target.value,
      selectedClan,
      selectedSect
    );
  };

  
/*   const handleSelectDisc2 = (event: SelectChangeEvent<typeof selectedDisc>) => {
   const {
      target: { value },
    } = event;
    setSelectedDisc(typeof value === 'string' ? value.split(',') : value);
  }; */ 

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
          <IconButton size='small' onClick={() => handleMore()}>
            <MoreVert style={{ fill: 'darkcyan' }} />
          </IconButton>
        </div>
      <LibraryNavbarModal
        open={showMore}
        selectedSect={selectedSect}
        selectedClan={selectedClan}
        selectedLibraryCardType={selectedLibraryCardType}
        selected_discList={selected_discList}
        handleClan={handleClan}
        handleMore={handleMore}
        handleSect={handleSect}
        handleSelectDisc={handleSelectDisc}
        handleChangeLibraryCardType={handleChangeLibraryCardType}
      />
      </div>

    </>
  );
};

export default NavbarLibrary;
