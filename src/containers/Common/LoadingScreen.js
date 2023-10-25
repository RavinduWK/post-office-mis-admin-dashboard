import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingScreen = ({ text = "Please Wait..." }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.85)",
        zIndex: 2000,
      }}
    >
      <Typography variant="h3" sx={{ color: "#F2C848", marginBottom: "40px" }}>
        {text}
      </Typography>
      <CircularProgress
        size={60}
        thickness={5}
        variant="indeterminate"
        sx={{ color: "#F2C848" }}
      />
    </Box>
  );
};

export default LoadingScreen;
