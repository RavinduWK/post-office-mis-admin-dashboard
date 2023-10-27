import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, useTheme, Grid } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { auth } from "../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardButton from "../../components/Buttons/DashboardButton";
import { formatDateAndTime } from "../../services/dateAndTime";

const DashboardSupervisor = () => {
  const theme = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
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
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { date, time } = formatDateAndTime(currentDateTime);

  return (
    <Box p={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            style={{
              marginTop: 5,
              marginLeft: 5,
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            Supervisor Dashboard
          </Typography>
        </Box>
        <Box
          textAlign="right"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.typography,
              marginBottom: 2,
            }}
          >
            {date}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: theme.palette.text.typography }}
          >
            {time}
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 1,
          marginBottom: 4,
          backgroundColor: theme.palette.background.applicationForm,
        }}
      >
        <Typography sx={{ marginBottom: 2 }} variant="h4" align="center">
          Welcome, {userDetails?.name}!
        </Typography>

        <Typography variant="h5" align="center">
          Ready to manage today's tasks?
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Mail Assignments */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<MailOutlineIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title=" Mail Assignments"
            description="Fast delivery services."
            href="/supervisor/mail-assignment"
          />
        </Grid>

        {/* Mail Transfer */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={
              <TransferWithinAStationIcon
                sx={{ fontSize: 60, color: "#F2C848" }}
              />
            }
            title="Mail Transfer"
            description="View and manage the transfer list of mails."
            href="/supervisor/mail-transfer"
          />
        </Grid>

        {/* Register Employee */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<PersonAddIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Register Employee"
            description="Register new employees and assign roles."
            href="/supervisor/register-employee"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSupervisor;
