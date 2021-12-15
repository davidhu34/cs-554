import { useContext, useState } from 'react';
import { doSocialSignIn } from '../../application/firebase/FirebaseFunctions';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/Auth';
import Axios from 'axios';
import GoogleButton from 'react-google-button';

const SignUp = () => {
  const [dummy, setDummy] = useState();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log('Current User Data:\n', currentUser?.providerData[0]);
  // const findUser = async () => {
  //   try {
  //     const { data } = await Axios.get('http://localhost:3001/user/all');
  //     console.log('MGUSERS: ', data);
  //     if (data) {
  //       data.map((user) => {
  //         userExist =
  //           currentUser && currentUser?.providerData[0].email === user.email
  //             ? true
  //             : false;
  //         if (userExist === true) {
  //           userExist = true;
  //           return;
  //         }
  //         console.log('user Exist(findUser): \n', userExist);
  //         console.log(
  //           `User: ${user.email} \n currentUser email: ${currentUser?.providerData[0].email}`
  //         );
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // if (userExist === true) {
  //   console.log('Hey welcome back');
  // } else {
  //   console.log('Welcome to washTastic');
  // }
  // if (currentUser !== null) {
  //   console.log('CurrentUser:', currentUser.providerData);
  //   return <Navigate to="/logout" />;
  // }
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
      console.log('Signon current user:', currentUser);
      navigate('/');
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div>
      <GoogleButton
        onClick={() => {
          socialSignOn('google');
        }}
        alt="google signin"
        type="light"
        style={{ margin: 10 }}
      />
    </div>
  );
};

export default SignUp;
