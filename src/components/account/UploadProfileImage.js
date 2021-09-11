import React, { useCallback, useState } from "react";
import {
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
  ListItem,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

//components
import AppButton from "../app-button";

// utils
import { storage, updateUserProfilePic } from "../../firebase/utils";

// icons
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import CheckIcon from "@material-ui/icons/Check";

export default function UploadProfileImage({ currentUser }) {
  // formate date object returned from db
  const timeStampDate = currentUser.createdAt;
  const dateInMillis = timeStampDate.seconds * 1000;
  const date = new Date(dateInMillis).toDateString();
  const [uploadProgess, setUploadProgess] = useState(null);

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
          setUploadProgess(progress);
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
      // setUploadProgess(false);
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
    <div>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {currentUser.avatarUrl ? (
              <Avatar
                alt=""
                src={currentUser.avatarUrl}
                style={styles.avatar}
              />
            ) : (
              <Avatar alt="" style={styles.avatar}>
                J
              </Avatar>
            )}
          </ListItemAvatar>
          <div style={{ marginTop: "18px", marginLeft: "15px" }}>
            <ListItemText
              primary={`${currentUser.firstName} ${currentUser.lastName}`}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {currentUser.email}
                  </Typography>
                  <br></br>
                  {" Member Since "} {date}
                </React.Fragment>
              }
            />
          </div>
        </ListItem>
      </List>

      <div style={styles.uploadWrapper}>
        <div className="dropzone ">
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
              <div className="text-left">
                <AppButton
                  color="white"
                  bgColor="black"
                  width="130px"
                  height="50px"
                  borderRadius="25px"
                  label={
                    uploadProgess
                      ? "Uploading..."
                      : uploadProgess === 100
                      ? "Upload"
                      : "Upload"
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  avatar: {
    height: 100,
    width: 100,
  },
  uploadWrapper: {
    marginLeft: "auto",
  },
};
