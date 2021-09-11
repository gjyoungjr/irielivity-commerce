import React, { useState } from "react";
import { Divider } from "@material-ui/core";

// components
import AppButton from "../../app-button";
import Notification from "../../snackbar-notif/Notification";
import ConfirmationAlert from "../../alert";
import Reauthenticate from "../Reauthenticate";

// utils
import { deleteUser } from "../../../firebase/utils";

export default function DeleteAccount({ currentUser }) {
  const { userAuth } = currentUser;
  const [displayNotif, setDisplayNotif] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [displayReauth, setDisplayReauth] = useState(false);

  const removeUser = async () => {
    await deleteUser(userAuth);
    await userAuth
      .delete()
      .then(() => {
        setDisplayNotif(true);
      })
      .catch(({ code }) => {
        setDisplayReauth(true);
        console.log(code);
      });
  };
  return (
    <div>
      <Reauthenticate
        open={displayReauth}
        onClose={() => setDisplayReauth(false)}
        currentUser={currentUser}
      />
      <ConfirmationAlert
        open={confirm}
        title="Delete Account"
        msg="Are you sure you want to delete your account?"
        onClose={() => setConfirm(false)}
        removeUser={removeUser}
      />
      <Notification
        open={displayNotif}
        message="Successfully deleted account"
        onClose={() => setDisplayNotif(false)}
      />
      <Divider style={{ marginBottom: "20px" }} />
      <div className="d-flex justify-content-between">
        <p style={{ marginTop: "5px" }}>Delete Account</p>
        <AppButton
          onClick={() => setConfirm(true)}
          width="15%"
          bgColor="black"
          color="white"
          label="Delete"
        />
      </div>
      <Divider style={{ marginTop: "20px" }} />
    </div>
  );
}
