import { useContext } from 'react';
import { doSignOut } from '../../application/firebase/FirebaseFunctions';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/Auth';

const SignOut = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleSignOut(e) {
    e.preventDefault();
    // currentUser.clear();
    console.log('in SIgnout handleSIgnout', currentUser);
    doSignOut();
    navigate('/login');
    console.log(currentUser);
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
