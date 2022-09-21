import './NavbarCryptList.css';

import {
  Box,
  Divider,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { HighlightOff, MoreVert, Search } from '@mui/icons-material';
import { PropType, TitleType, discType } from '../../../../types/crypt_type';
import {
  capacityType,
  getCapacities,
  getDiscInf,
  getDiscList,
  getGroups,
} from '../../../../util';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
import MoreFilterModal from './MoreFilterModal';
import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField/TextField';
import { groupType } from '../../../../util';
import { useHistory } from 'react-router-dom';
import MoreFilterModalSmall from './MoreFilterModalSmall';

interface NavbarListProps {
  searchList: (
    name: string,
    discList: string[],
    clan: string,
    sect: string,
    title: TitleType,
    props: PropType,
    group: groupType,
    maxCap: capacityType,
    minCap: capacityType
  ) => void;
  handleReset: () => void;
  deckMode?: boolean;
}

const NavbarCryptList = (navbarListProps: NavbarListProps) => {
  const { handleReset, deckMode } = navbarListProps;
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const [selectedClan, setSelectedClan] = React.useState<string>('');
  const [selectedSect, setSelectedSect] = React.useState<string>('');
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
  const [selectedTitle, setSelectedTitle] = React.useState<TitleType>({
    NoTitle: false,
    Vote1: false,
    Votes2: false,
    Archbishop: false,
    Baron: false,
    Bishop: false,
    Cardinal: false,
    InnerCircle: false,
    Justicar: false,
    Magaji: false,
    Primogen: false,
    Prince: false,
    Priscus: false,
    Regent: false,
    Titled: false,
  });

  const history = useHistory();

  const disc_inf: string[] = getDiscInf();
  const disc_sup: string[] = disc_inf.map((dis) => dis.toUpperCase());

  const values: number[] = disc_inf.map((elem) => 0);
  const aux: discType = { name: disc_inf, value: values };

  const groups: groupType[] = getGroups();
  const cap: capacityType[] = getCapacities();

  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    setSelectedTitle({
      NoTitle: false,
      Vote1: false,
      Votes2: false,
      Archbishop: false,
      Baron: false,
      Bishop: false,
      Cardinal: false,
      InnerCircle: false,
      Justicar: false,
      Magaji: false,
      Primogen: false,
      Prince: false,
      Priscus: false,
      Regent: false,
      Titled: false,
    });
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
  const prepareTitleField = (title: string): string => {
    if (title === '1 vote') {
      return 'Vote1';
    }
    if (title === '2 votes') {
      return 'Votes2';
    }
    if (title === 'Inner Circle') {
      return 'InnerCircle';
    }
    if (title === 'No Title') {
      return 'NoTitle';
    }
    return title;
  };
  const handleTitle = (
    title: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let titleField: string = prepareTitleField(title);
    const newTitle: TitleType = {
      ...selectedTitle,
      [titleField]: event.target.checked,
    };

    setSelectedTitle(newTitle);

    searchList(
      inputSearch,
      getDiscList(selected_discList),
      selectedClan,
      selectedSect,
      newTitle,
      checked,
      selectedGroup,
      selectedMaxCap,
      selectedMinCap
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

  const checkboxTitle = (title: string): boolean => {
    if (title === '1 vote') {
      const value = 'Vote1';
      return selectedTitle[value];
    }
    if (title === '2 votes') {
      const value = 'Votes2';
      return selectedTitle[value];
    }
    if (title === 'Inner Circle') {
      const value = 'InnerCircle';
      return selectedTitle[value];
    }
    if (title === 'No Title') {
      const value = 'NoTitle';
      return selectedTitle[value];
    }
    return selectedTitle[title as keyof TitleType];
  };

  const handleGoBack = (): void => {
    history.push('/');
  };

  React.useEffect(() => {}, []);

  const { searchList } = navbarListProps;
  return (
    <>
      <Divider />
      <Box className='navbarList'>
        {!deckMode ? (
          <IconButton onClick={() => handleGoBack()}>
            <ArrowBackIcon />
          </IconButton>
        ) : null}
        <Box className='navbarList__left'>
          <Typography variant='h5'>Crypt</Typography>
        </Box>
        <Box className='navbarList__right'>
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
          <IconButton
            size='small'
            onClick={() => handleSearch()}
            className='searchIcon'
            disabled={inputSearch.length > 0}
          >
            <Search />
          </IconButton>
          <IconButton size='small' onClick={() => handleMore()}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      {isMobile ? (
        <MoreFilterModalSmall
          showMore={showMore}
          handleMore={handleMore}
          selected_discList={selected_discList}
          handleSelectDisc={handleSelectDisc}
          disc_sup={disc_sup}
          selectedClan={selectedClan}
          handleClan={handleClan}
          selectedSect={selectedSect}
          handleSect={handleSect}
          checkboxTitle={checkboxTitle}
          handleTitle={handleTitle}
          handleSliders={handleSliders}
          selectedGroup={selectedGroup}
          selectedMaxCap={selectedMaxCap}
          selectedMinCap={selectedMinCap}
          groups={groups}
          handleSliderGroup={handleSliderGroup}
          handleSliderMaxCap={handleSliderMaxCap}
          handleSliderMinCap={handleSliderMinCap}
          handleCheck={handleCheck}
          checked={checked}
          handleResetButton={handleResetButton}
        />
      ) : (
        <MoreFilterModal
          showMore={showMore}
          handleMore={handleMore}
          selected_discList={selected_discList}
          handleSelectDisc={handleSelectDisc}
          disc_sup={disc_sup}
          selectedClan={selectedClan}
          handleClan={handleClan}
          selectedSect={selectedSect}
          handleSect={handleSect}
          checkboxTitle={checkboxTitle}
          handleTitle={handleTitle}
          handleSliders={handleSliders}
          selectedGroup={selectedGroup}
          selectedMaxCap={selectedMaxCap}
          selectedMinCap={selectedMinCap}
          groups={groups}
          handleSliderGroup={handleSliderGroup}
          handleSliderMaxCap={handleSliderMaxCap}
          handleSliderMinCap={handleSliderMinCap}
          handleCheck={handleCheck}
          checked={checked}
          handleResetButton={handleResetButton}
        />
      )}
    </>
  );
};

export default NavbarCryptList;
