import React, { useState, useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import {
  Typography,
  TextField,
  Button,
  Box,
  Input,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { db, imageDB, auth } from "../../config/firebase";

const EditProfile = ({ userDetails }) => {
  const [formData, setFormData] = useState({
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    NIC: userDetails?.NIC || "",
    role: userDetails?.role || "",
    DOB: userDetails?.DOB || "",
  });
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(userDetails?.profile_photo);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreviewImage(objectURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let file;
    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length > 0
    ) {
      file = fileInputRef.current.files[0];
    }

    if (file) {
      try {
        const storageRef = ref(
          imageDB,
          `employeeProfilePictures/${auth.currentUser.uid}`
        );
        const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);

        if (uploadTaskSnapshot.state === "success") {
          const downloadURL = await getDownloadURL(storageRef);
          formData.profile_photo = downloadURL;
        } else {
          alert("There was an issue uploading the image.");
          return; // exit function
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Error while uploading image. Please try again.");
        return; // exit function
      }
    }

    try {
      await setDoc(doc(db, "employees", auth.currentUser.uid), formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Error while updating profile. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Typography variant="h4" textAlign="center">
        Edit Profile
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={2}
      >
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <img
              src={previewImage}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginBottom: "15px",
              }}
            />
            <Input
              type="file"
              id="icon-button-file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              inputProps={{ accept: "image/*" }}
              ref={fileInputRef}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            disabled
          />
          <TextField
            label="NIC"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.NIC}
            disabled
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.role}
            disabled
          />
          <TextField
            label="Date of Birth"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.DOB}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, DOB: e.target.value }))
            }
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
