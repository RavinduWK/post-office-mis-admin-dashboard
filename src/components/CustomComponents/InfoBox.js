import React, { useState } from "react";
import { Box, Typography, Avatar, Divider, IconButton } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const InfoBox = ({ location, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Box
      sx={{
        width: isCollapsed ? 0 : 300,
        height: "100vh",
        backgroundColor: "#F2F2F2",
        padding: 2,
        boxShadow: 3,
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderLeft: "6px solid #ded0b6",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 5,
          top: 5,
          zIndex: 2,
          color: "grey",
        }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <IconButton
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          position: "absolute",
          right: isCollapsed ? 5 : 250,
          bottom: 100,
          zIndex: 2,
          backgroundColor: isCollapsed ? "grey" : undefined,
          color: isCollapsed ? "white" : "grey",
        }}
      >
        {isCollapsed ? (
          <ArrowBackIosOutlinedIcon />
        ) : (
          <ArrowForwardIosOutlinedIcon />
        )}
      </IconButton>
      <Avatar
        alt="Profile Picture"
        src={`../../assets/user1.png`}
        sx={{ width: 56, height: 56, my: 2 }}
      />
      <Typography
        variant="h4"
        sx={{
          fontSize: "1.5rem",
          color: "#3f3430",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        {location.name}
      </Typography>

      <Box sx={{ width: "100%", padding: "0 1rem" }}>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        >
          Latitude:
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", color: "#7D7D7D", marginBottom: "1rem" }}
        >
          {location.lat}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        >
          Longitude:
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", color: "#7D7D7D", marginBottom: "1rem" }}
        >
          {location.lng}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        >
          Email:
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", color: "#7D7D7D", marginBottom: "1rem" }}
        >
          {location.email}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        >
          Contact no:
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", color: "#7D7D7D", marginBottom: "1rem" }}
        >
          {location.contact_number}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoBox;
