import React, { useState, useContext, useEffect } from "react";
import FlexBetween from "./FlexBetween";
import { ColorModeContext, tokens } from "../../styles/theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { auth } from "../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Divider,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  NotificationsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

const TopBar = ({ isCollapsed, setIsCollapsed, role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "employees", user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          } else {
            console.error("No such user!");
          }
        } else {
          console.error("No user logged in!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={2}
      paddingY={1}
      backgroundColor={colors.white}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* LEFT SIDE */}
      <FlexBetween>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="16px"
        >
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="12px"
          >
            <Box sx={{ objectFit: "cover" }}>
              <img
                alt="logo"
                height="60px"
                src={`../../assets/app-logo.png`}
                style={{ cursor: "pointer" }}
              />
            </Box>

            <Box sx={{ objectFit: "cover" }}>
              <img
                alt="logo"
                height="30px"
                src={`../../assets/app-logo-text.png`}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Box>
      </FlexBetween>

      <FlexBetween gap="1rem">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton>
          <SettingsOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        {/* User Tile */}
        <Button
          onClick={handleClick}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "none",
            gap: "1rem",
          }}
        >
          <Box sx={{ objectFit: "cover" }}>
            <img
              alt="profile-user"
              height="45px"
              width="45px"
              src={userDetails?.profile_photo}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          </Box>

          <Box textAlign="left">
            <Typography
              color={colors.grey[100]}
              fontWeight="bold"
              fontSize="0.85rem"
            >
              {userDetails?.name || "Loading..."}{" "}
            </Typography>
            <Typography color={colors.grey[100]} fontSize="0.75rem">
              {userDetails?.role || "Loading..."}{" "}
            </Typography>
          </Box>

          <ArrowDropDownOutlined sx={{ fontSize: "25px" }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ "& .MuiPaper-root": { width: "250px", marginLeft: "160px" } }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Help</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Log Out</MenuItem>
        </Menu>
      </FlexBetween>
    </Box>
  );
};

export default TopBar;
