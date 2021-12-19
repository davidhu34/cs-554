import Axios from 'axios';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';
import { AuthContext } from '../../application/firebase/auth';
import { setUser } from '../../application/redux/actions/user';
import { useDispatch } from 'react-redux';
const GroupForm = (props) => {
  const [errorDB, setErrorDB] = useState();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { register, handleSubmit, error } = useForm();
  const dispatch = useDispatch();
  let i = 0;
  const handleFormSubmit = async (data) => {
    console.log('CUrrent User group list:', currentUser);
    console.log('form submit data: ', data);
    try {
      i++;

      if (currentUser.groupId === null) {
        const res = await Axios.post('http://localhost:3001/group', {
          name: data.groupName,
          users: [currentUser],
        });
        console.log('Res Data: \n', res.data.users[0]);

        // setCurrentUser(res.data.users[0]);
        setCurrentUser({ ...currentUser, groupId: res.data._id });

        dispatch(setUser({ ...currentUser, groupId: res.data._id }));
      }
      console.log('Counter:', i);
    } catch (e) {
      setErrorDB('Group Already Exist');
      console.error(errorDB);
    }
  };
  return (
    <Container sx={{ margin: 2, gap: 2 }}>
      {console.log('Current User:', currentUser)}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography
          sx={{ margin: 2, gap: 2, justifyContent: 'left' }}
          component="h1"
          variant="h5"
        >
          Create a Group:
        </Typography>
        <label htmlFor="groupName"></label>
        <TextField
          id="groupName"
          {...register('groupName', { required: true })}
        />
        <Button sx={{ margin: 2, gap: 2 }} type="submit" variant="contained">
          Enter
        </Button>
      </form>
      {errorDB && errorDB ? (
        <Alert variant="outlined" severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorDB}
        </Alert>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default GroupForm;
