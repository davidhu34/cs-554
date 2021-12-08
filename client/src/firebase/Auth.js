import { useState, useEffect, createContext } from 'react';
import firebaseApp from './Firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      console.log(
        'Current User{Firebase}:\n',
        user?.providerData[0] ?? undefined
      );
      setCurrentUser(user);
      setLoadingUser(false);
    });
  }, []);

  if (loadingUser) {
    return (
      <div>
        <h1>Loading....Loading....Loading....Loading....Loading....</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
