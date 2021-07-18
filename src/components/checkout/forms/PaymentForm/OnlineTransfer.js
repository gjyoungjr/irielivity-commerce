import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  makeStyles,
  Fab,
  Button,
  LinearProgress,
  withStyles,
  Avatar,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { useFormikContext } from "formik";
import Lottie from "lottie-react";

// utils
import { storage } from "../../../../firebase/utils";

// animation
import successAnimation from "../../../../assets/lottie-animations/lf30_editor_cxbfigoa.json";

// icons
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import CloudUploadTwoToneIcon from "@material-ui/icons/CloudUploadTwoTone";
import CheckIcon from "@material-ui/icons/Check";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

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
    backgroundColor: "rgba(23.0, 82.0, 255.0, 0.4)",
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

export default function OnlineTransfer() {
  const classes = useStyles();
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setFieldValue } = useFormikContext();

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
            setFieldValue("paymentReceipt", downloadURL);
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
    accept: ".pdf, image/jpeg, image/png",
  });

  return (
    <Card className="p-2 mb-40" style={styles.card}>
      <CardContent>
        <div className="text-left" style={{ width: "100%" }}>
          <p style={styles.bottomSpacer1}>
            Payment can be made to the below account, via online transfers.
          </p>
          <p style={styles.bottomSpacer}>Bank: Heritage Bank</p>
          <p style={styles.bottomSpacer}>Account Name: Zyania Alonzo</p>
          <p>Account No: 9217462</p>
        </div>

        <div className="dropzone text-center mt-10">
          <div {...getRootProps({ className: "dropzone-upload-wrapper" })}>
            <input {...getInputProps()} />
            <div className="dropzone-inner-wrapper-1">
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
                  <Fab style={{ backgroundColor: "black" }}>
                    <CloudUploadTwoToneIcon
                      style={{ color: "white" }}
                      className="d-50"
                    />
                  </Fab>
                  <div className="font-size-sm">
                    Upload receipt of payment here.{" "}
                    <span className="font-size-xs text-dark">
                      (Acceptable format: pdf or jpeg/png )
                    </span>
                  </div>
                </div>
              )}

              <small className="py-2 text-black-50">or</small>
              <div>
                <Button style={styles.btn}>
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
        </div>

        {uploadProgress ? (
          <Card style={styles.card} className="p-2">
            <div className="d-flex justify-content-between">
              <Avatar className={classes.avatar}>
                <PictureAsPdfIcon style={{ color: "black" }} />
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
      </CardContent>
    </Card>
  );
}

const styles = {
  bottomSpacer: {
    marginBottom: "-5px",
  },
  bottomSpacer1: {
    marginBottom: "1px",
    opacity: 0.7,
  },
  card: {
    borderRadius: "9px",
    boxShadow: "none",
    border: "1px solid #F2F2F2",
    backgroundColor: "#fdfbf4",
  },
  btn: {
    borderRadius: "20px",
    textTransform: "none",
    backgroundColor: "black",
  },
};
