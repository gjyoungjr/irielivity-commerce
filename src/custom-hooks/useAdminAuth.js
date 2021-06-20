import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// utils
import { checkIsUserAdmin } from "../firebase/utils";

// get current user from redux state
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = () => {
  const { currentUser } = useSelector(mapState);
  // use for redirect
  const history = useHistory();

  useEffect(() => {
    if (!checkIsUserAdmin(currentUser)) {
      history.push("/");
    }
  }, [currentUser, history]);

  return currentUser;
};

export default useAdminAuth;
