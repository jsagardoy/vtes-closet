import { TextField } from '@material-ui/core';
import { HighlightOff, MoreVert, Search } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import React from 'react';
import { discType } from '../../../../types/crypt_type';
import { LibraryType } from '../../../../types/library_type';
import {
  getClanIcon,
  getClans,
  getDiscIcon,
  getDiscInf,
  getDiscList,
  getLibraryCardTypes,
  getSects,
} from '../../../../util';
import './LibraryNavbarList.css';

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
  const [showMoreDisc, setShowMoreDisc] = React.useState<boolean>(false);
  const [selectedLibraryCardType, setSelectedLibraryCardType] =
    React.useState<string>('any');
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
    value === 2 ? (aux.value[index] = 0) : (aux.value[index] = value + 1);
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

  const handleShowMoreDisc = (): void => {
    setShowMoreDisc(!showMoreDisc);
  };


  const handleSelectDisc2 = (event: SelectChangeEvent<typeof selectedDisc>) => {
    const {
      target: { value },
    } = event;
    setSelectedDisc(typeof value === 'string' ? value.split(',') : value);
  };

  React.useEffect(() => { }, []);
  

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
      </div>
      <Modal
        open={showMore}
        onClose={() => handleMore()}
        className='navbar__bottom'
      >
        <div className='filter__container'>
          <Select
            variant='standard'
            label='Disciplines'
            multiple
            onChange={handleSelectDisc2}
          >
            <MenuItem>
              {getDiscIcon(selected_discList.name).map((dis, index) => (
                <IconButton
                  key={index}
                  size='small'
                  onClick={() => handleSelectDisc(index)}
                >
                  {selected_discList.value[index] === 0 ? (
                    <Avatar className='opacity__disc' src={dis} alt={dis} />
                  ) : (
                    <Avatar src={dis} alt={dis} />
                  )}
                </IconButton>
              ))}
              </MenuItem>
          </Select>

          <Divider />
          <div className='filter__clan'>
            <InputLabel id='library_card_type_id'>Card Type</InputLabel>
            <FormControl variant='standard'>
              <Select
                labelId='library_card_type_id'
                id='library_card_type_id'
                value={selectedLibraryCardType}
                label='Card Type'
                className='select__clan'
                onChange={handleChangeLibraryCardType}
              >
                {getLibraryCardTypes().map((t) => (
                  <MenuItem value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className='filter__clan'>
            <InputLabel>Clan</InputLabel>
            <FormControl variant='standard'>
              <Select
                id='clan__select__id'
                labelId='select__clan__standard__label'
                className='select__clan'
                value={selectedClan}
                onChange={handleClan}
                label='Clan'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {getClans().map((clan) => (
                  <MenuItem key={clan} value={clan}>
                    <Avatar
                      className='select__clan__avatar__icon'
                      src={getClanIcon([clan]).find((c) => c)}
                      alt={clan}
                    />
                    {clan}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className='filter__sect'>
            <InputLabel>Sect</InputLabel>
            <FormControl variant='standard'>
              <Select
                id='select__sect__id'
                labelId='select__sect__standard__label'
                className='select__sect'
                value={selectedSect}
                onChange={handleSect}
                label='Sect'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {getSects().map((sect) => (
                  <MenuItem key={sect} value={sect}>
                    {sect}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NavbarLibrary;
