import { useContext, useState } from 'react';
import { doSocialSignIn } from '../../application/firebase/firebaseFunctions';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button';

const SignUp = () => {
  const [dummy, setDummy] = useState();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/group" />;
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
    <Container fixed>
      <Typography variant="h2" component="h1">
        Welcome to WashTastic
      </Typography>
      <Typography variant="inherit">
        To access the website, Please login to your google account.
      </Typography>
      <GoogleButton
        onClick={() => {
          socialSignOn('google');
        }}
        alt="google signin"
        type="light"
        style={{ margin: 10 }}
      />
    </Container>
  );
};

export default SignUp;
