import React from 'react';
import {
  HighlightOff,
  MoreVert,
  Search,
  SortByAlpha,
} from '@material-ui/icons';
import './NavbarCryptList.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { discType, PropType } from '../../../../types/crypt_type';
import TextField from '@mui/material/TextField/TextField';
import {
  getClans,
  getClanIcon,
  getDiscIcon,
  getDiscList,
  getSects,
  getTitle,
  capacityType,
  getDiscInf,
  getGroups,
  getCapacities,
} from '../../../../util';
import { Avatar, Button, InputLabel, MenuItem } from '@material-ui/core';
import Modal from '@mui/material/Modal/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, Divider, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SlidersComponent } from './SlidersComponent';
import { groupType } from '../../../../util';
import { Sort } from '@mui/icons-material';

interface NavbarListProps {
  searchList: (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: string,
    props: PropType,
    group: groupType,
    maxCap: capacityType,
    minCap: capacityType
  ) => void;
  handleSort: () => void;
  handleSortAZ: () => void;
  handleReset: () => void;
}

const NavbarCryptList = (navbarListProps: NavbarListProps) => {
  const { handleSort, handleSortAZ, handleReset } = navbarListProps;

  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const [selectedClan, setSelectedClan] = React.useState<string>('');
  const [selectedSect, setSelectedSect] = React.useState<string>('');
  const [selectedTitle, setSelectedTitle] = React.useState<string>('');
  const [rotate, setRotate] = React.useState<boolean>(false);
  const [rotateAZ, setRotateAZ] = React.useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = React.useState<groupType>({
    value: 0.5,
    label: 'Any',
  });
  const [selectedMaxCap, setSelectedMaxCap] = React.useState<capacityType>({
    value: 0,
    label: 'Any',
  });
  const [selectedMinCap, setSelectedMinCap] = React.useState<capacityType>({
    value: 0,
    label: 'Any',
  });
  const [checked, setChecked] = React.useState<PropType>({
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
  });

  const disc_inf: string[] = getDiscInf();
  const disc_sup: string[] = disc_inf.map((dis) => dis.toUpperCase());

  const values: number[] = disc_inf.map((elem) => 0);
  const aux: discType = { name: disc_inf, value: values };

  const groups: groupType[] = getGroups();
  const cap: capacityType[] = getCapacities();

  const [selected_discList, setSelected_discList] =
    React.useState<discType>(aux);

  const handleResetButton = () => {
    setInputSearch('');
    setSelectedClan('');
    const group: groupType = {
      value: 0.5,
      label: 'Any',
    };
    const maxCap: capacityType = {
      value: 0,
      label: 'Any',
    };
    const minCap: capacityType = {
      value: 0,
      label: 'Any',
    };
    handleSliders(group, maxCap, minCap);
    setSelectedSect('');
    setSelectedTitle('');
    setSelected_discList(aux);
    setChecked({
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
    });
    handleReset();
  };
  const handleFilterDisc = () => {
    const disc_list: string[] = getDiscList(selected_discList);
    searchList(
      inputSearch,
      disc_list,
      selectedClan,
      selectedSect,
      selectedTitle,
      checked,
      selectedGroup,
      selectedMaxCap,
      selectedMinCap
    );
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
        selectedTitle,
        checked,
        selectedGroup,
        selectedMaxCap,
        selectedMinCap
      );
    } else {
      setInputSearch('');
      searchList(
        '',
        getDiscList(selected_discList),
        selectedClan,
        selectedSect,
        selectedTitle,
        checked,
        selectedGroup,
        selectedMaxCap,
        selectedMinCap
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
      selectedTitle,
      checked,
      selectedGroup,
      selectedMaxCap,
      selectedMinCap
    );
  };
  const handleSect = (event: SelectChangeEvent) => {
    setSelectedSect(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedClan,
      event.target.value,
      selectedTitle,
      checked,
      selectedGroup,
      selectedMaxCap,
      selectedMinCap
    );
  };
  const handleTitle = (event: SelectChangeEvent) => {
    setSelectedTitle(event.target.value);
    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedClan,
      selectedSect,
      event.target.value,
      checked,
      selectedGroup,
      selectedMaxCap,
      selectedMinCap
    );
  };
  const prepareTitle = (title: string): string => {
    switch (title) {
      case '1 vote':
        return '1 vote (titled)';
      case '2 votes':
        return '2 votes (titled)';
      default:
        return title;
    }
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
      selectedClan,
      selectedSect,
      selectedTitle,
      newProps,
      selectedGroup,
      selectedMaxCap,
      selectedMinCap
    );
  };
  const handleSliders = (
    group: groupType,
    maxCap: capacityType,
    minCap: capacityType
  ) => {
    setSelectedGroup(group);
    setSelectedMaxCap(maxCap);
    setSelectedMinCap(minCap);

    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedClan,
      selectedSect,
      selectedTitle,
      checked,
      group,
      maxCap,
      minCap
    );
  };
  const handleRotate = () => {
    setRotate(!rotate);
  };
  const handleRotateAZ = () => {
    setRotateAZ(!rotateAZ);
  };
  const handleSliderGroup = (
    event: Event,
    group: number | number[],
    activeThumb: number
  ): void => {
    const elem = groups.find((g: groupType) => g.value === group);
    if (elem) {
      setSelectedGroup(elem);
    }
  };
  const handleSliderMaxCap = (
    event: Event,
    capacity: number | number[],
    activeThumb: number
  ): void => {
    const elem = cap.find((c: capacityType) => c.value === capacity);
    if (elem) {
      setSelectedMaxCap(elem);
    }
  };
  const handleSliderMinCap = (
    event: Event,
    capacity: number | number[],
    activeThumb: number
  ): void => {
    const elem = cap.find((c: capacityType) => c.value === capacity);
    if (elem) {
      setSelectedMinCap(elem);
    }
  };

  React.useEffect(() => {}, []);

  const { searchList } = navbarListProps;
  return (
    <>
      <div className='navbarList'>
        <div className='navbarList__left'>
          <h3>Crypt</h3>
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
            size='small'
            onClick={() => {
              handleRotateAZ();
              handleSortAZ();
            }}
          >
            <SortByAlpha
              className={rotateAZ ? 'button__activated__AZ' : ''}
              style={{ fill: 'darkcyan' }}
            />
          </IconButton>
          <IconButton
            className={rotate ? 'button__rotation' : ''}
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
                  size='small'
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
          <Divider />
          <div className='filter__title'>
            <InputLabel>Title</InputLabel>
            <FormControl variant='standard'>
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
          <Divider />
          <div className='filter__slider__group'>
            <SlidersComponent
              filterSliders={handleSliders}
              group={selectedGroup}
              maxCapacity={selectedMaxCap}
              minCapacity={selectedMinCap}
              groups={groups}
              handleSliderGroup={handleSliderGroup}
              handleSliderMaxCap={handleSliderMaxCap}
              handleSliderMinCap={handleSliderMinCap}
            />
          </div>
          <Divider />
          <div className='filter__props'>
            <div className='prop__column'>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.bleed}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('bleed', e)
                  }
                />
                <InputLabel>+ Bleed</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.strength}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('strength', e)
                  }
                />
                <InputLabel>+ Strength</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.stealth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('stealth', e)
                  }
                />
                <InputLabel>+ Stealth</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.intercept}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('intercept', e)
                  }
                />
                <InputLabel>+ Intercept</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.aggravated}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('aggravated', e)
                  }
                />
                <InputLabel>Aggravated</InputLabel>
              </div>

              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.enter_combat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('enter_combat', e)
                  }
                />
                <InputLabel>Enter combat</InputLabel>
              </div>
            </div>
            <div className='prop__column'>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.flight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('flight', e)
                  }
                />
                <InputLabel>Flight</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.black_hand}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('black_hand', e)
                  }
                />
                <InputLabel>Black Hand</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.red_list}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('red_list', e)
                  }
                />
                <InputLabel>Red List</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.infernal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('infernal', e)
                  }
                />
                <InputLabel>Infernal</InputLabel>
              </div>
              <div className='prop__pair'>
                <Checkbox
                  size='small'
                  checked={checked.slave}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheck('slave', e)
                  }
                />
                <InputLabel>Slave</InputLabel>
              </div>
            </div>
          </div>
          <Divider />
          <div className='clear__button'>
            <Button
              style={{
                color: 'darkcyan',
                textTransform: 'capitalize',
                backgroundColor: '#ECDBBA',
                border: '1px solid darkcyan',
                borderRadius: '2px',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
              size='small'
              onClick={() => handleResetButton()}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NavbarCryptList;
