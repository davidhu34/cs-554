import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';
import Box from '@mui/system/Box';
import { useMediaQuery, useTheme } from '@mui/material';

import ClothesPage from '../Clothes';
import BasketPage from '../Basket';
import { SignUp, SignOut } from '../Users';
import { Group } from '../Group';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useBasketMonitor } from '../../application/hooks/data';

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  // TODO: get group ID as message topic
  // useGroupTopic({ groupId: 'abc', onMessage });
  useBasketMonitor();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
      }}
    >
      {matches && currentUser && <SideBar />}
      <Box sx={{ flexGrow: 1 }}>
        {currentUser && <NavBar />}
        <Routes>
          <Route path="/" element={<Group />} />
          {!currentUser && <Route path="/login" element={<SignUp />} />}
          <Route path="/logout" element={<SignOut />} />
          <Route path="/clothes/*" element={<ClothesPage />} />

          <Route>Unknown</Route>
        </Routes>
      </Box>
    </Box>
  );
}
