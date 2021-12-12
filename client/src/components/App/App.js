import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';

import ClothesPage from '../Clothes';
import BasketPage from '../Basket';
import { SignUp, SignOut } from '../Users';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useGroupTopic } from '../../application/hooks/messaging';

function onMessage(payload) {
  console.log('message payload', payload);
}
export default function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  
  // TODO: get group ID as message topic
  useGroupTopic({ groupId: 'abc', onMessage });

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
      }}
    >
      {matches && <SideBar />}
      <Box sx={{ flexGrow: 1 }}>
        <NavBar />
        <Routes>
          <Route path="/" element={'asdasd'} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/logout" element={<SignOut />} />
          <Route path="/clothes/*" element={<ClothesPage />} />
          <Route path="/baskets/*" element={<BasketPage />} />

          <Route>Unknown</Route>
        </Routes>
      </Box>
    </Box>
  );
}
