import React from 'react';
import { MoreVert, Search } from '@material-ui/icons';
import './NavbarList.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { CryptType } from '../../types/crypt_type';
import TextField from '@mui/material/TextField/TextField';
import { getDiscIcon } from '../../util';
import { Avatar } from '@material-ui/core';
interface NavbarListProps {
  cardType: string;
  list: CryptType[];
  searchList: (condition: string) => void;
}

const NavbarList = (props: NavbarListProps) => {
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [showMore, setShowMore] = React.useState<boolean>(false);
  type discType = {
    name: string[];
    value: number[];
  };
  const disc_inf: string[] = [
    'abo',
    'ani',
    'aus',
    'cel',
    'chi',
    'dai',
    'dem',
    'dom',
    'for',
    'mel',
    'myt',
    'nec',
    'obe',
    'obf',
    'obt',
    'pot',
    'pre',
    'pro',
    'qui',
    'san',
    'ser',
    'spi',
    'tem',
    'thn',
    'tha',
    'val',
    'vic',
    'vis',
  ];

  const disc_sup: string[] = disc_inf.map((dis) => dis.toUpperCase());

  const values: number[] = disc_inf.map((elem) => 0);
  let aux: discType = { name: disc_inf, value: values };

  const [selected_discList, setSelected_discList] =
    React.useState<discType>(aux);

  const handleSelectDisc = (index: number) => {
    let value: number = selected_discList.value[index];
    let aux: discType = { ...selected_discList };

    value === 2 ? (aux.value[index] = 0) : (aux.value[index] = value + 1);
    setSelected_discList(aux);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    searchList(e.target.value);
  };
  const handleSearch = () => {
    setShowInput(!showInput);
  };
  const handleMore = () => {
    setShowMore(!showMore);
  };

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          ) : null}
          <IconButton size='small' onClick={() => handleSearch()}>
            <Search style={{ fill: 'darkcyan' }} />
          </IconButton>
          <IconButton size='small'>
            <MoreVert
              style={{ fill: 'darkcyan' }}
              onClick={() => handleMore()}
            />
          </IconButton>
        </div>
      </div>
      {showMore ? (
        <div className='navbar__bottom'>
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
        </div>
      ) : null}
    </>
  );
};

export default NavbarList;
