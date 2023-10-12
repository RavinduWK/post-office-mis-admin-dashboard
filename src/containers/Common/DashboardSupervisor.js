import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const DashboardSupervisor = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Supervisor's Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Mail Assignment Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, height: "100%" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <MailOutlineIcon sx={{ fontSize: 60, color: "#852318" }} />
              <Typography variant="h6" gutterBottom>
                Mail Assignments
              </Typography>
              <Typography>
                Assign mails to postmen and manage the distribution.
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/mail-assignment"
                >
                  Go to Mail Assignments
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Mail Transfer Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, height: "100%" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <TransferWithinAStationIcon
                sx={{ fontSize: 60, color: "#852318" }}
              />
              <Typography variant="h6" gutterBottom>
                Mail Transfer
              </Typography>
              <Typography>
                View and manage the transfer list of mails.
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/mail-transfer"
                >
                  Go to Mail Transfer
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Register Employee Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, height: "100%" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <PersonAddIcon sx={{ fontSize: 60, color: "#852318" }} />
              <Typography variant="h6" gutterBottom>
                Register Employee
              </Typography>
              <Typography>Register new employees and assign roles.</Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/register-employee"
                >
                  Go to Register Employee
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSupervisor;
