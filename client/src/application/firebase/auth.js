import { useState, useEffect, createContext, useLayoutEffect } from 'react';
import firebaseApp from './firebase';
import Axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  let userExist;
  let response;

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  // const [userExist, setUserExist] = useState(false);
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      console.log('Current User{Firebase}:\n', user);
      // Making post request to mongodb
      try {
        if (user?.providerData[0]) {
          response = await Axios.post(
            'http://localhost:3001/user',
            user.providerData[0]
          );
          console.log(response);
        } else {
        }
      } catch (error) {
        console.log(error);
      }

      // const { data } = await Axios.get('http://localhost:3001/user/all');
      // console.log(user && user?.providerData[0]);
      // user?.providerData[0] &&
      //   data.map((user1) => {
      //     if (
      //       user?.providerData[0] &&
      //       user1.email === user?.providerData[0].email
      //     ) {
      //       // setUserExist(() => true);
      //       userExist = true;
      //       console.log(
      //         'Email check: ',
      //         user?.providerData[0] &&
      //           user1.email === user?.providerData[0].email
      //       );
      //       console.log(user1.email, user?.providerData[0].email, userExist);
      //       setLoadingUser(false);

      //       return;
      //     } else {
      //       // setUserExist(false);
      //       userExist = false;
      //       console.log('Email check else: ', userExist);
      //       setLoadingUser(false);
      //     }
      //   });
      setLoadingUser(false);
    });

    async function fetchUserData() {
      // const { data } = await Axios.get('http://localhost:3001/user/all');
      // console.log(currentUser && currentUser?.providerData[0]);
      // currentUser?.providerData[0] &&
      //   data.map((user) => {
      //     if (
      //       currentUser?.providerData[0] &&
      //       user.email === currentUser?.providerData[0].email
      //     ) {
      //       setUserExist(() => true);
      //       console.log(
      //         'Email check: ',
      //         currentUser?.providerData[0] &&
      //           user.email === currentUser?.providerData[0].email
      //       );
      //       console.log(
      //         user.email,
      //         currentUser?.providerData[0].email,
      //         userExist
      //       );
      //       setLoadingUser(false);
      //       return;
      //     } else {
      //       setUserExist(false);
      //       console.log('Email check else: ', userExist);
      //       setLoadingUser(false);
      //     }
      //   });
    }
  }, []);

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
