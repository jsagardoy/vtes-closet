import { Menu, MenuItem } from '@mui/material';

import React from 'react';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleGoProfile: () => void;
  handleLogout: () => Promise<void>;
  handleMyTournaments: () => void;
}
const UserInfoMenu = (props: Props) => {
  const { open, handleGoProfile, handleLogout, handleClose, anchorEl, handleMyTournaments } = props;

  return (
    <Menu id='userMenu' open={open} onClose={handleClose} anchorEl={anchorEl}>
      <MenuItem onClick={() => handleGoProfile()}>Profile</MenuItem>
      <MenuItem onClick={() => handleMyTournaments()}>My Tournaments</MenuItem>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </Menu>
  );
};

export default UserInfoMenu;
