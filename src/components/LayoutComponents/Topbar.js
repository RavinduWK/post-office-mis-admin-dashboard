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
  Dialog,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  NotificationsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import ProfilePopup from "../../containers/Common/ProfilePage";
import EditProfile from "../Options/EditProfile";
import NotificationsDialog from "../NotificationsDialog";

const TopBar = ({ isCollapsed, setIsCollapsed, role }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const textColor =
    theme.palette.mode === "dark"
      ? theme.palette.neutral.light
      : theme.palette.neutral.dark;
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfileOpen = () => {
    setIsProfileOpen(true);
    setAnchorEl(null);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

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

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={2}
      paddingY={1}
      backgroundColor={theme.palette.background.topbar}
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
        <IconButton onClick={handleNotificationsToggle}>
          <NotificationsOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton onClick={() => setIsSettingsOpen(true)}>
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
            <Typography color={textColor} fontWeight="bold" fontSize="0.85rem">
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
          <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>{" "}
          <MenuItem onClick={() => setIsSettingsOpen(true)}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Help</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Log Out</MenuItem>
        </Menu>
      </FlexBetween>
      {isProfileOpen && userDetails && (
        <ProfilePopup userDetails={userDetails} onClose={handleProfileClose} />
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      >
        <Box display="flex" p={2} minHeight="400px">
          {/* Left Column */}
          <Box flex="1" pr={2} minWidth="200px">
            <List>
              <ListItem
                button
                onClick={() => setSelectedSetting("editProfile")}
              >
                <ListItemText primary="Edit Profile" />
              </ListItem>
              <ListItem button onClick={() => setSelectedSetting("editFont")}>
                <ListItemText primary="Edit Font" />
              </ListItem>
            </List>
          </Box>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem />

          {/* Right Column */}
          <Box flex="3" overflow="auto" maxHeight="500px">
            {selectedSetting === "editProfile" && (
              <EditProfile userDetails={userDetails} />
            )}
            {selectedSetting === "editFont" && (
              <Box>
                <EditProfile userDetails={userDetails} />
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
      <NotificationsDialog
        open={isNotificationsOpen}
        onClose={handleNotificationsToggle}
      />
    </Box>
  );
};

export default TopBar;
