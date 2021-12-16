import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log('Protected Route:', currentUser);
  if (currentUser === null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
