import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute';
export default function App() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  // TODO: get group ID as message topic
  // useGroupTopic({ groupId: 'abc', onMessage });
  useBasketMonitor();

  //   useEffect(() => {
  //     if (!currentUser) {
  //       navigate('/login');
  //   }
  // },[])

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
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Group />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<SignUp />} />
          <Route path="/logout" element={<SignOut />} />
          <Route
            path="/clothes/*"
            element={
              <ProtectedRoute>
                <ClothesPage />
              </ProtectedRoute>
            }
          />

          <Route>Unknown</Route>
        </Routes>
      </Box>
    </Box>
  );
}
