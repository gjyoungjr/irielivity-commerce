import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// utils
// import { checkIsUserAdmin } from "../firebase/utils";

// get current user from redux state
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

// pass current user to custom hook
const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  // use for redirect
  const history = useHistory();

  // // boolean state is admin
  // const isAdmin = checkIsUserAdmin(currentUser);

  useEffect(() => {
    // if user not signed in redirect to sign in
    if (!currentUser) {
      history.push(process.env.PUBLIC_URL + "/");
    }

    // if (isAdmin) {
    //   history.push(process.env.PUBLIC_URL + "/");
    // }
  }, [currentUser, history]);

  return currentUser;
};

export default useAuth;
