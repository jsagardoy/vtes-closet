import React from 'react';
import { HighlightOff, MoreVert, Search } from '@material-ui/icons';
import './NavbarList.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { CryptType, discType, disciplines_inf } from '../../types/crypt_type';
import TextField from '@mui/material/TextField/TextField';
import { getClans, getDiscIcon, getDiscList, getSects, getTitle } from '../../util';
import { Avatar, InputLabel, MenuItem } from '@material-ui/core';
import Modal from '@mui/material/Modal/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import { Divider, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface NavbarListProps {
  cardType: string;
  list: CryptType[];
  searchList: (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: string
  ) => void;
}

const NavbarList = (props: NavbarListProps) => {
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const [selectedClan, setSelectedClan] = React.useState<string>('');
  const [selectedSect, setSelectedSect] = React.useState<string>('');
  const [selectedTitle, setSelectedTitle] = React.useState<string>('');

  const disc_inf: string[] = disciplines_inf;
  const disc_sup: string[] = disc_inf.map((dis) => dis.toUpperCase());

  const values: number[] = disc_inf.map((elem) => 0);
  let aux: discType = { name: disc_inf, value: values };

  const [selected_discList, setSelected_discList] =
    React.useState<discType>(aux);

  const handleFilterDisc = () => {
    const disc_list: string[] = getDiscList(selected_discList);
    searchList(inputSearch, disc_list, selectedClan, selectedSect, selectedTitle);
  };

  const handleSelectDisc = (index: number) => {
    let value: number = selected_discList.value[index];
    let aux: discType = { ...selected_discList };
    value === 2 ? (aux.value[index] = 0) : (aux.value[index] = value + 1);
    setSelected_discList(aux);
    handleFilterDisc();
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
        selectedClan,
        selectedSect,
        selectedTitle
      );
    } else {
      setInputSearch('');
      searchList(
        '',
        getDiscList(selected_discList),
        selectedClan,
        selectedSect,
        selectedTitle
      );
    }
  };
  const handleSearch = () => {
    setShowInput(!showInput);
  };
  const handleMore = () => {
    setShowMore(!showMore);
  };
  const handleClan = (event: SelectChangeEvent) => {
    setSelectedClan(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      event.target.value,
      selectedSect,
      selectedTitle
    );
  };

  const handleSect = (event: SelectChangeEvent) => {
    setSelectedSect(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedClan,
      event.target.value,
      selectedTitle
    );
  };
  const handleTitle = (event: SelectChangeEvent) => {
    setSelectedTitle(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedClan,
      selectedSect,
      event.target.value
    );
  };

  const prepareTitle = (title: string): string => {
    switch (title) {
      case '1 vote': return '1 vote (titled)';
      case '2 votes': return '2 votes (titled)';
      default: return title;
      }
  }

  React.useEffect(() => {}, []);

  const { cardType, searchList } = props;
  return (
    <>
      <div className='navbarList'>
        <div className='navbarList__left'>
          <h3>{cardType}</h3>
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
          <div className='disc__container'>
            {getDiscIcon(selected_discList.name).map((dis, index) => {
              return (
                <IconButton
                  key={dis}
                  className='disc__icon'
                  onClick={() => handleSelectDisc(index)}
                >
                  {selected_discList.value[index] === 0 ? (
                    <Avatar className='opacity__disc' src={dis} alt={dis} />
                  ) : selected_discList.value[index] === 1 ? (
                    <Avatar src={dis} alt={dis} />
                  ) : (
                    <Avatar
                      src={getDiscIcon(disc_sup)[index]}
                      alt={getDiscIcon(disc_sup)[index]}
                    />
                  )}
                </IconButton>
              );
            })}
          </div>
          <Divider />
          <div className='filter__clan'>
            <InputLabel>Clan</InputLabel>
            <FormControl variant='standard'>
              <Select
                id='select__clan__id'
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
            <FormControl variant='standard'>
              <InputLabel>Title</InputLabel>
              <Select
                id='select__title__id'
                labelId='select__title__standard__label'
                className='select__title'
                value={selectedTitle}
                onChange={handleTitle}
                label='Title'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {getTitle().map((title) => (
                  <MenuItem key={title} value={prepareTitle(title)}>
                    {title}
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

export default NavbarList;
