import React from "react";
import { Hidden } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// components
import AppButton from "../../app-button";

// utils fxn
import { checkIsUserAdmin } from "../../../firebase/utils";

// grabs user auth from redux store
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function MobileAuthNav({ handleOpenAuthForm }) {
  const history = useHistory();

  // destructure current user from redux state
  const { currentUser } = useSelector(mapState);

  //boolean state to detrmine if user is amdin
  const isAdmin = checkIsUserAdmin(currentUser);

  return (
    <Hidden mdUp>
      {!currentUser ? (
        <div className="mobile-auth-wrapper d-flex justify-content-start">
          <div className="mr-2">
            <AppButton
              type="submit"
              bgColor="transparent"
              color="white"
              label="Sign in"
              height="45px"
              borderRadius="30px"
              width="150px"
              border="1px solid white"
              onClick={handleOpenAuthForm}
            />
          </div>
          <div>
            <AppButton
              type="submit"
              bgColor="white"
              color="black"
              label="Register"
              height="45px"
              borderRadius="30px"
              width="150px"
              onClick={handleOpenAuthForm}
            />
          </div>
        </div>
      ) : (
        <div className="mobile-auth-wrapper">
          <div>
            {currentUser && !isAdmin && (
              <AppButton
                type="submit"
                bgColor="white"
                color="black"
                label="Account"
                height="45px"
                borderRadius="30px"
                width="150px"
                onClick={() => history.push("/members")}
              />
            )}
            {currentUser && isAdmin && (
              <AppButton
                type="submit"
                bgColor="white"
                color="black"
                label="Dashboard"
                height="45px"
                borderRadius="30px"
                width="150px"
                onClick={() => history.push("/admin/home")}
              />
            )}
          </div>
        </div>
      )}
    </Hidden>
  );
}
