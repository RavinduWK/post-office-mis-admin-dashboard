import React from "react";
import { Container, Typography, Box, Paper, Avatar } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const DashBoard = () => {
  return (
    <Container maxWidth="xl">
      <Box display="flex">
        {/* Main Content */}
        <Box flexGrow={1} p={3}>
          <Paper elevation={3} style={{ background: "#f5f5f5" }}>
            <Box p={3}>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Avatar
                  style={{ backgroundColor: "#3f51b5", marginRight: "15px" }}
                >
                  <MailOutlineIcon />
                </Avatar>
                <Typography variant="h4" gutterBottom>
                  Welcome, Receptionist!
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                You're all set to manage the day's tasks. Select an option from
                the sidebar to get started.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                If you have any questions or need assistance, feel free to ask
                your supervisor.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default DashBoard;
