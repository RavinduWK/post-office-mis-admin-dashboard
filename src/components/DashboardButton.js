import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, Typography, useTheme, Button } from "@mui/material";

const DashboardButton = ({ icon, title, description, href }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        height: "100%",
        backgroundColor: theme.palette.background.applicationForm,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {icon}
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Go to {title}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DashboardButton;
