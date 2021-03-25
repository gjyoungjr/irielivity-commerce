import React, { useState, useCallback } from "react";
import {
  Fab,
  Button,
  LinearProgress,
  withStyles,
  makeStyles,
  Card,
  Avatar,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { useFormikContext } from "formik";
import Lottie from "lottie-react";

// icons
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import CloudUploadTwoToneIcon from "@material-ui/icons/CloudUploadTwoTone";
import CheckIcon from "@material-ui/icons/Check";
import ImageIcon from "@material-ui/icons/Image";

// animation
import successAnimation from "../../../../../assets/lottie-animations/lf30_editor_cxbfigoa.json";

// utils
import { storage } from "../../../../../firebase/utils";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 10,
    width: "70%",
    marginLeft: "30px",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "rgba(23.0, 82.0, 255.0, 0.8)",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: "rgba(23.0, 82.0, 255.0, 0.3)",
    height: 56,
    width: 56,
  },
}));

export default function LivePreviewExample() {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [uploadProgress, setUploadProgress] = useState(null);
  const [fileName, setFileName] = useState("");

  // fxn uploads image to firebase storage
  const onDrop = useCallback(
    (acceptedFiles) => {
      // accept first file
      // & create  reference to file
      const file = acceptedFiles[0];
      setFileName(file.name);
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
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setFieldValue("mainImgUrl", downloadURL);
          });
        }
      );
    },
    [setFieldValue]
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
    <>
      <div className="dropzone text-center">
        <div {...getRootProps({ className: "dropzone-upload-wrapper" })}>
          <input {...getInputProps()} />
          <div className="dropzone-inner-wrapper">
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
                <Fab color="primary">
                  <CloudUploadTwoToneIcon className="d-50" />
                </Fab>
                <div className="font-size-sm">
                  Drag and drop files here{" "}
                  <span className="font-size-xs text-dark">
                    (jpg/png images)
                  </span>
                </div>
              </div>
            )}

            <small className="py-2 text-black-50">or</small>
            <div>
              <Button
                style={{
                  borderRadius: "20px",
                  textTransform: "none",
                  backgroundColor: "rgba(23.0, 82.0, 255.0, 1)",
                }}
              >
                <span className="px-2" style={{ color: "white" }}>
                  Browse Files
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="font-weight-bold my-4 text-uppercase text-dark font-size-sm text-center">
          Uploaded Files
        </div>

        {uploadProgress ? (
          <Card style={{ borderRadius: "9px" }} className="p-2">
            <div className="d-flex justify-content-between">
              <Avatar className={classes.avatar}>
                <ImageIcon style={{ color: "#1752FF" }} />
              </Avatar>

              <div style={{ width: "100%" }}>
                <p style={{ marginLeft: "30px" }}>{fileName}</p>
                <BorderLinearProgress
                  variant="determinate"
                  value={uploadProgress}
                />
              </div>

              {uploadProgress === 100 && (
                <Lottie
                  animationData={successAnimation}
                  loop={false}
                  style={{ height: "32px", marginTop: "20px" }}
                />
              )}
            </div>
          </Card>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
