import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/system/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { AuthContext } from '../../../application/firebase/auth';
import { doSignOut } from '../../../application/firebase/firebaseFunctions';
const accountMenuId = 'account-menu';
export default function NavBar() {
  //Dhruveel's Changes
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleSignOut(e) {
    console.log('Before Prevent');
    e.preventDefault();
    // currentUser.clear();

    Axios.post('http://localhost:3001/user/logout', currentUser).then(
      (response) => {
        console.log(response);
      }
    );
    setCurrentUser(null);
    console.log('in SIgnout handleSIgnout', currentUser);
    doSignOut();
    navigate('/login');
    console.log(currentUser);
  }

  // Dhruveel's Changes ends here

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              display: { xs: 'block', sm: 'none' },
            }}
          >
            WashTastic
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ gap: 1 }}
            >
              {currentUser.name}
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {accountMenu}
    </>
  );
}
