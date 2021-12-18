import { useState, useEffect, createContext } from 'react';
import firebaseApp from './firebase';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

import { setUser as setUserAction } from '../../application/redux/actions/user';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  let userExist;
  let response;

  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);

  const [loadingUser, setLoadingUser] = useState(false);
  // const [userExist, setUserExist] = useState(false);

  const obj = {
    _id: '61b6b124fd135f4eb08dfefd',
    uid: '104811364644330735224',
    name: 'Dhruveel Doshi',
    email: 'ddoshi4@stevens.edu',
    createdAt: 1639362852591,
  };
  useEffect(() => {
    if (user === null) {
      firebaseApp.auth().onAuthStateChanged((user) => {
        console.log('user from google:', user);
        setUser(user);
        setLoadingUser(false);
      });
    }
  }, [user]);

  // post user into Database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user?.providerData[0] && currentUser === null) {
        console.log('in AUth useEffect');
        console.log('user before calling API: ', user);
        console.log('in AUth useEffect Before Calling Axios');

        const { data } = await Axios.post(
          'http://localhost:3001/user',
          user.providerData[0]
        );
        console.log('user After calling API:', data);
        setCurrentUser(data);
        dispatch(setUserAction(data));
        setLoadingUser(false);
      }
      if (!user) {
        setCurrentUser(null);
        dispatch(setUserAction(null));
        setLoadingUser(false);
      }
    };
    fetchUserData();
  }, [dispatch, user]);

  console.log('user before set into the context:', currentUser);
  if (loadingUser) {
    return (
      <div>
        <h1>Loading....Loading....Loading....Loading....Loading....</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
