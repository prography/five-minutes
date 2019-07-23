import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { Divider, ProfilePhoto } from '.';
import { IUser } from '../models/user';
import { history } from '../utils/history';
import { MenuList, MenuItem } from '../styles/common';

export interface IProfileMenuProps extends IUser {
  logout: () => void;
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 10px;
  }
`

const ProfileMenu: React.SFC<IProfileMenuProps> = ({ id, nickname, image, logout }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Menu 액션
  const withClose = <T extends Function>(fn: T) => {
    return () => {
      handleClose();
      fn();
    }
  };
  const handlePost = withClose(() => {
    history.push(`/ask`);
  });
  const handleProfile = withClose(() => {
    history.push(`/profile/${id}`);
  });
  const handleLogout = withClose(logout);
  return (
    <>
      <button onClick={handleClick}><ProfilePhoto src={image} /></button>
      <Popper id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              <MenuItem onClick={handleProfile}>
                <UserInfo>
                  <ProfilePhoto src={image} width={40} />
                  <div>{nickname}</div>
                </UserInfo>
              </MenuItem>
              <MenuItem onClick={handlePost}>코드 올리기</MenuItem>
              <MenuItem isDivider><Divider /></MenuItem>
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
