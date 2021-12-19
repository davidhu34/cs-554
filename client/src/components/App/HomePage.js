import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../application/firebase/auth';
const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <Container
      align="center"
      sx={{ margin: 5, gap: 5, padding: 5, justifyContent: 'center' }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to <strong>WashTastic</strong>
      </Typography>

      <Container align="left">
        CS 554 Web Programing 2 - (Final Project Submission)
        <br /> Contributors <hr />
        <ul>
          <li>Ming Wei Hu</li>
          <li>Vivian Dbritto</li>
          <li>Smit Gor</li>
          <li>Dhruveel Doshi</li>
        </ul>
        {!currentUser && (
          <Button variant="contained" onClick={() => navigate('/login')}>
            {' '}
            Back
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default HomePage;
