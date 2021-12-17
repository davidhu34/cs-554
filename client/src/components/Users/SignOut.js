import { useContext } from 'react';
import { doSignOut } from '../../application/firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../application/redux/actions/user';

const SignOut = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSignOut(e) {
    console.log('Before Prevent');
    e.preventDefault();
    // currentUser.clear();
    console.log('in SIgnout handleSIgnout', currentUser);
    // Axios.get('http://localhost:3001/user/logout').then((response) => {
    //   console.log(response);
    // });

    doSignOut();
    setCurrentUser(null);
    dispatch(setUser(null));
    navigate('/login');
    // console.log(currentUser);
  }
  //   if (currentUser === null) {
  //     return <Navigate to="/login" />;
  //   }
  return (
    <div>
      <button type="button" onClick={handleSignOut}>
        Sign Out
        {/* {console.log('HandleSignOut: ', currentUser)} */}
      </button>
      {/* {!currentUser ? <Navigate to="/login" /> : 'Logged In'} */}
    </div>
  );
};

export default SignOut;
