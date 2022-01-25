import { TextField } from '@material-ui/core';
import { HighlightOff, MoreVert, Search, Sort } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import React from 'react';
import { discType } from '../../../../types/crypt_type';
import { LibraryPropType } from '../../../../types/library_type';
import { getDiscInf, getDiscList } from '../../../../util';
import './LibraryNavbarList.css';
import LibraryNavbarModal from './LibraryNavbarModal';

interface NavbarLibraryProps {

  searchList: (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => void;
  handleSort: () => void;
}

const values: number[] = getDiscInf().map(() => 0);
let aux: discType = { name: getDiscInf(), value: values };

const NavbarLibrary = (props: NavbarLibraryProps): any => {
  const { searchList, handleSort } = props;
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const [rotate, setRotate] = React.useState<boolean>(false);

  const [selectedLibraryCardType, setSelectedLibraryCardType] =
    React.useState<string>('Any');
  const [selected_discList, setSelected_discList] =
    React.useState<discType>(aux);

  const [checked, setChecked] = React.useState<LibraryPropType>({
    bleed: false,
    strength: false,
    stealth: false,
    intercept: false,
    aggravated: false,
    enter_combat: false,
    flight: false,
    black_hand: false,
    red_list: false,
    infernal: false,
    slave: false,
    banned: false,
    clanless: false,
    titled: false,
    anarch: false,
    combo: false,
    burnable: false,
    blood_cost: false,
    pool_cost: false,
    disciplineless: false,
  });
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
      selectedSect,
      checked
    );
  };

  const handleCheck = (
    prop: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newProps = {
      ...checked,
      [prop]: event.target.checked,
    };
    setChecked(newProps);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedLibraryCardType,
      selectedClan,
      selectedSect,
      newProps
    );
  };
  const handleClan = (event: SelectChangeEvent) => {
    setSelectedClan(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedLibraryCardType,
      event.target.value,
      selectedSect,
      checked
    );
  };

  const handleSect = (event: SelectChangeEvent) => {
    setSelectedSect(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedLibraryCardType,
      selectedClan,
      event.target.value,
      checked
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
        selectedSect,
        checked
      );
    } else {
      setInputSearch('');
      searchList(
        '',
        getDiscList(selected_discList),
        selectedLibraryCardType,
        selectedClan,
        selectedSect,
        checked
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
      selectedSect,
      checked
    );
  };
  

  const handleRotate = () => {
    setRotate(!rotate);
}

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
          <IconButton
            className = {rotate ? 'button__rotation' : ''}
            size='small'
            onClick={() => {
              handleRotate();
              handleSort();
            }}
          >
            <Sort style={{ fill: 'darkcyan' }} />
          </IconButton>
          <IconButton size='small' onClick={() => handleMore()}>
            <MoreVert style={{ fill: 'darkcyan' }} />
          </IconButton>
        </div>
        <LibraryNavbarModal
          open={showMore}
          selectedSect={selectedSect}
          selectedClan={selectedClan}
          checked={checked}
          selectedLibraryCardType={selectedLibraryCardType}
          selected_discList={selected_discList}
          handleClan={handleClan}
          handleMore={handleMore}
          handleSect={handleSect}
          handleSelectDisc={handleSelectDisc}
          handleChangeLibraryCardType={handleChangeLibraryCardType}
          handleCheck={handleCheck}
        />
      </div>
    </>
  );
};

export default NavbarLibrary;
