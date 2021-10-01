import React from 'react';
import { MoreVert, Search } from '@material-ui/icons';
import './NavbarList.css';

interface NavbarListProps {
  cardType: string;
}

const NavbarList = (props: NavbarListProps) => {
  const { cardType } = props;
  return (
    <div className='navbarList'>
      <div className='navbarList__left'>
        <h3>{cardType}</h3>
      </div>
      <div className='navbarList__right'>
        <Search style={{ fill: 'darkcyan' }} />
        <MoreVert style={{ fill: 'darkcyan' }} />
      </div>
    </div>
  );
};

export default NavbarList;
