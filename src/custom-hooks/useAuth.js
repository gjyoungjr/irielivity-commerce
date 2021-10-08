import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// get current user from redux state
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

// pass current user to custom hook
const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  // use for redirect
  const history = useHistory();

  useEffect(() => {
    // if user not signed in redirect to sign in
    if (!currentUser) {
      alert("Please sign up and create an account to checkout items in your cart.");
      history.push(process.env.PUBLIC_URL + "/home");
    }
  }, [currentUser, history]);

  return currentUser;
};

export default useAuth;
