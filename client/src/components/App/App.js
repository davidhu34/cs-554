import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Box from '@mui/system/Box';
import { useMediaQuery, useTheme } from '@mui/material';

import { AuthContext } from '../../application/firebase/auth';
import { useBasketMonitor } from '../../application/hooks/data';
import Clothes from '../Clothes';
import Basket from '../Basket';
import { Group } from '../Group';
import Task from '../Task';
import { SignUp } from '../Users';

import NoPageFound from './NoPageFound';
import HomePage from './HomePage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
      {matches && currentUser && currentUser.groupId && <SideBar />}
      <Box sx={{ flexGrow: 1 }}>
        {currentUser && <NavBar />}
        {/* <NavBar /> */}
        <Routes>
          <Route
            path="/group"
            element={
              <ProtectedRoute isGroup>
                <Group />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<SignUp />} />
          <Route
            path="/clothes/*"
            element={
              <ProtectedRoute>
                <Clothes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/baskets/*"
            element={
              <ProtectedRoute>
                <Basket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/*"
            element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
