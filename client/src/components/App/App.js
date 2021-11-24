import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';

import ClothesPage from '../Clothes';

import NavBar from './NavBar';
import SideBar from './SideBar';

export default function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%', alignItems: 'stretch' }}>
      {matches && <SideBar />}
      <Box sx={{ flexGrow: 1 }}>
        <NavBar />
        <Routes>
          <Route path="/" element={'asdasd'} />
          <Route path="/clothes/*" element={<ClothesPage />} />
          <Route>Unknown</Route>
        </Routes>
      </Box>
    </Box>
  );
}
