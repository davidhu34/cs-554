import Axios from 'axios';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AuthContext } from '../../application/firebase/auth';
const GroupForm = (props) => {
  const [errorDB, setErrorDB] = useState();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { register, handleSubmit, error } = useForm();

  const handleFormSubmit = async (data) => {
    console.log('CUrrent User group list:', currentUser);
    try {
      if (currentUser) {
        const res = await Axios.post('http://localhost:3001/group', {
          name: data.groupName,
          users: [currentUser],
        });
        console.log('Res Data: \n', res.data.users[0]);
        setCurrentUser(res.data.users[0]);
      }
      console.log('Current User:', [currentUser]);
    } catch (e) {
      setErrorDB('Group Already Exist');
      console.log(errorDB);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>Enter Group Name: </label>
        <input {...register('groupName', { required: true })} />
        <input type="submit" />
      </form>
      {errorDB && errorDB ? (
        <Alert variant="outlined" severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorDB}
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GroupForm;
