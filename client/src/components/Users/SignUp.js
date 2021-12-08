import { useContext } from 'react';
import { doSocialSignIn } from '../../firebase/FirebaseFunctions';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';
import GoogleButton from 'react-google-button';
const SignUp = () => {
  const { currentUser } = useContext(AuthContext);

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
        onClick={() => socialSignOn('google')}
        alt="google signin"
        type="light"
        style={{ margin: 10 }}
      />
    </div>
  );
};

export default SignUp;
