import { useContext } from 'react';
import { doSignOut } from '../../application/firebase/firebaseFunctions';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../application/firebase/auth';

const SignOut = () => {
  const { currentUser } = useContext(AuthContext);

  //   if (currentUser === null) {
  //     return <Navigate to="/login" />;
  //   }
  return (
    <div>
      <button type="button" onClick={doSignOut}>
        Sign Out
      </button>
      {!currentUser ? <Navigate to="/login" /> : 'Logged In'}
    </div>
  );
};

export default SignOut;
