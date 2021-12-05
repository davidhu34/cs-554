import { useContext } from "react";
import { doSocialSignIn } from "../../firebase/FirebaseFunctions";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../firebase/Auth";

const SignUp = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser !== null) {
    console.log("CurrentUser:", currentUser);
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
      <img
        onClick={() => socialSignOn("google")}
        alt="google signin"
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fjavascript.plainenglish.io%2Fhow-to-set-up-google-oauth-in-react-with-react-google-login-9c6538389fde&psig=AOvVaw3b1T7oduCMyynPhnzpHaLf&ust=1638655102188000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPD5hpDQyPQCFQAAAAAdAAAAABAJ"
      />
    </div>
  );
};

export default SignUp;
