import { useContext, useState } from 'react';
import { doSocialSignIn } from '../../application/firebase/firebaseFunctions';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';
import Axios from 'axios';
import GoogleButton from 'react-google-button';

const SignUp = () => {
  const [dummy, setDummy] = useState();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }
  console.log('CUrrent User in SignUp:', currentUser);
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
      console.log('Signon current user:', currentUser);
      // navigate('/');
      if (currentUser) {
        // navigate('/');
      }
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
