import { useState, useEffect, createContext, useLayoutEffect } from 'react';
import firebaseApp from './firebase';
import Axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  let userExist;
  let response;

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
    firebaseApp.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoadingUser(false);
    });
  }, []);

  // post user into Database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.providerData[0]) {
        const { data } = await Axios.post(
          'http://localhost:3001/user',
          user.providerData[0]
        );
        console.log('data', data);
        setCurrentUser(data);
      }
    };
    fetchUserData();
  }, [user]);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const { data } = await Axios.get('http://localhost:3001/user/all');
  //       console.log(data);
  //       data.map((user) => {
  //         if (
  //           currentUser?.providerData[0] &&
  //           user.email === currentUser?.providerData[0].email
  //         ) {
  //           setUserExist(true);
  //           console.log(
  //             'Email check: ',
  //             currentUser?.providerData[0] &&
  //               user.email === currentUser?.providerData[0].email
  //           );
  //           console.log(
  //             user.email,
  //             currentUser?.providerData[0].email,
  //             userExist
  //           );
  //           return;
  //         } else {
  //           setUserExist(false);
  //           console.log('Email check else: ', userExist);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);
  console.log('current user', currentUser);
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
