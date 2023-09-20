import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProfilePopup = ({ userDetails, onClose }) => {
  return (
    <Box sx={styles.popupBackground}>
      <Box sx={styles.popupBox}>
        <Box sx={styles.headerBox}>
          <Typography variant="h6">Profile</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Divider
              sx={{
                flexGrow: 1,
                mr: 1,
                marginTop: "10px",

                height: "1px",
                backgroundColor: "grey",
                borderBottomWidth: 1,
              }}
            />
            <img
              src={userDetails.profile_photo}
              alt="Profile"
              style={styles.profileImage}
            />
            <Divider
              sx={{
                flexGrow: 1,
                ml: 1,
                marginTop: "10px",

                height: "1px",
                backgroundColor: "grey",
                borderBottomWidth: 1,
              }}
            />
          </Box>
          <Box sx={styles.infoRow}>
            <Box sx={styles.infoColumn}>
              <Typography sx={styles.heading} color="grey.700">
                Full Name
              </Typography>
              <Typography sx={styles.value}>{userDetails.name}</Typography>
            </Box>

            <Box sx={styles.infoColumn}>
              <Typography sx={styles.heading} color="grey.700">
                Email
              </Typography>
              <Typography sx={styles.value}>{userDetails.email}</Typography>
            </Box>
          </Box>
          <Box sx={styles.infoRow}>
            <Box sx={styles.infoColumn}>
              <Typography sx={styles.heading} color="grey.700">
                NIC
              </Typography>
              <Typography sx={styles.value}>{userDetails.NIC}</Typography>
            </Box>

            <Box sx={styles.infoColumn}>
              <Typography sx={styles.heading} color="grey.700">
                Role
              </Typography>
              <Typography sx={styles.value}>{userDetails.role}</Typography>
            </Box>
          </Box>
          <Box sx={styles.infoRow}>
            <Box sx={styles.infoColumn}>
              <Typography sx={styles.heading} color="grey.700">
                Date of Birth
              </Typography>
              <Typography sx={styles.value}>{userDetails.DOB}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const styles = {
  popupBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 20px 15px 20px",
  },
  popupBox: {
    width: "800px",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "15px 20px 15px 20px",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid #000",
    marginBottom: "15px",
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    mt: 2,
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
  },
  heading: {
    fontWeight: 600,
    fontSize: "1.2em",
  },
  value: {
    fontSize: "1em",
  },
};
export default ProfilePopup;
