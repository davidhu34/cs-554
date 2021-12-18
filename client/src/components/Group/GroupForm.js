import Axios from 'axios';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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

        setCurrentUser(res.data.users[0]);
        dispatch(setUser(res.data.users[0]));
      }
      console.log('Counter:', i);
    } catch (e) {
      setErrorDB('Group Already Exist');
      console.log(errorDB);
    }
  };
  return (
    <div>
      {console.log('Current User:', currentUser)}
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
