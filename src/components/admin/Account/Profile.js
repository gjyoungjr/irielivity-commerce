import React, { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Avatar,
  Box,
  Fab,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

// utils
import { storage, updateUserProfilePic } from "../../../firebase/utils";

// icons
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import CheckIcon from "@material-ui/icons/Check";

const user = {
  jobTitle: "Super Admin",
  timezone: new Date(),
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

// get current user from redux state
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // accept first file
      // & create  reference to file
      const file = acceptedFiles[0];
      // setFileName(file.name);
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      const uploadTask = fileRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            updateUserProfilePic(currentUser.userAuth, downloadURL);
          });
        }
      );
    },
    [currentUser.userAuth]
  );

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <Card
      elevation={10}
      style={styles.card}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar
            className={classes.avatar}
            src={currentUser.avatarUrl || ""}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.jobTitle}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format("LLLL")} `}
          </Typography>
        </Box>
      </CardContent>
      <Divider />

      <div style={styles.uploadWrapper}>
        <div className="dropzone text-center">
          <div {...getRootProps({ className: "dropzone-upload-wrapper" })}>
            <input {...getInputProps()} />
            {isDragAccept && (
              <div>
                <div className="d-100 btn-icon mb-3 hover-scale-lg bg-success shadow-success-sm rounded-circle text-white">
                  <CheckIcon className="d-50" />
                </div>
                <div className="font-size-sm text-success">
                  All files will be uploaded!
                </div>
              </div>
            )}
            {isDragReject && (
              <div>
                <div className="d-100 btn-icon mb-3 hover-scale-lg bg-danger shadow-danger-sm rounded-circle text-white">
                  <CloseTwoToneIcon className="d-50" />
                </div>
                <div className="font-size-sm text-danger">
                  Some files will be rejected!
                </div>
              </div>
            )}
            {!isDragActive && (
              <div>
                <Fab color="primary" style={styles.fabIcon}>
                  <CameraAltIcon className="d-50" />
                </Fab>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const styles = {
  fabIcon: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  uploadWrapper: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
  card: {
    borderRadius: "15px",
  },
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
