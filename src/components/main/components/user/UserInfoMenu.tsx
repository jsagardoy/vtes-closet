import { Menu, MenuItem } from '@mui/material';

import React from 'react';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleGoProfile: () => void;
  handleLogout: () => Promise<void>;
}
const UserInfoMenu = (props: Props) => {
  const { open, handleGoProfile, handleLogout, handleClose, anchorEl } = props;

  return (
    <Menu id='userMenu' open={open} onClose={handleClose} anchorEl={anchorEl}>
      <MenuItem onClick={() => handleGoProfile()}>Profile</MenuItem>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </Menu>
  );
};

export default UserInfoMenu;
