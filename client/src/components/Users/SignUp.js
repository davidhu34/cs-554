import { useContext, useState } from 'react';
import { doSocialSignIn } from '../../application/firebase/firebaseFunctions';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';
import Axios from 'axios';
import GoogleButton from 'react-google-button';
const SignUp = () => {
  const [dummy, setDummy] = useState();
  const { currentUser } = useContext(AuthContext);
  console.log('Socks:\n', currentUser?.providerData[0]);
  const findUser = async () => {
    try {
      const mgUser = await Axios.get('http://localhost:3001/user/all');
      console.log('MGUSERS: ', mgUser);
    } catch (error) {
      console.log(error);
    }
  };
  if (currentUser !== null) {
    console.log('CurrentUser:', currentUser.providerData);
    return <Navigate to="/logout" />;
  }
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <GoogleButton
        onClick={() => {
          socialSignOn('google');
          findUser();
        }}
        alt="google signin"
        type="light"
        style={{ margin: 10 }}
      />
    </div>
  );
};

export default SignUp;
