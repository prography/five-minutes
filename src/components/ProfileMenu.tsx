import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { ProfilePhoto } from '.';
import { IUser } from '../models/user';
import { history } from '../utils/history';

export interface IProfileMenuProps extends IUser {
  logout: () => void;
}
const ProfileMenu: React.SFC<IProfileMenuProps> = ({ id, logout }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Menu 액션
  const handleProfile = useCallback(() => {
    history.push(`/profile/${id}`);
  }, [id]);
  const handleLogout = useCallback(() => {
    handleClose();
    logout();
  }, [handleClose, logout]);
  return (
    <>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ProfilePhoto />
      </Button>
      <Popper
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              <MenuItem onClick={handleProfile}>프로필 보기</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default ProfileMenu;
