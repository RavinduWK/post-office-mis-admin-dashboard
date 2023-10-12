import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, useTheme, Grid } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { auth } from "../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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

  const formatDateAndTime = (dateObj) => {
    // For day of the week
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[dateObj.getDay()];

    // For day of the month (with suffix)
    const dateOfMonth = dateObj.getDate();
    let suffix = "th";
    if (dateOfMonth === 1 || dateOfMonth === 21 || dateOfMonth === 31) {
      suffix = "st";
    } else if (dateOfMonth === 2 || dateOfMonth === 22) {
      suffix = "nd";
    } else if (dateOfMonth === 3 || dateOfMonth === 23) {
      suffix = "rd";
    }

    // For month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[dateObj.getMonth()];

    // For year
    const year = dateObj.getFullYear();

    // For time
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    return {
      date: `${dayOfWeek} ${dateOfMonth}${suffix} ${monthName}, ${year}`,
      time,
    };
  };

  const { date, time } = formatDateAndTime(currentDateTime);

  return (
    <Box p={4}>
      <Box>
        <Typography
          variant="h2"
          style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          Supervisor Dashboard
        </Typography>
      </Box>
      <Box textAlign="right">
        <Typography variant="body1">{date}</Typography>
        <Typography variant="body1">{time}</Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 3,
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
        {/* Mail Assignment Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              height: "100%",
              backgroundColor: theme.palette.background.applicationForm,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <MailOutlineIcon sx={{ fontSize: 60, color: "#F2C848" }} />
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
                  href="mail-assignment"
                >
                  Go to Mail Assignments
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Mail Transfer Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              height: "100%",
              backgroundColor: theme.palette.background.applicationForm,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <TransferWithinAStationIcon
                sx={{ fontSize: 60, color: "#F2C848" }}
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
                  href="mail-transfer"
                >
                  Go to Mail Transfer
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Register Employee Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              height: "100%",
              backgroundColor: theme.palette.background.applicationForm,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <PersonAddIcon sx={{ fontSize: 60, color: "#F2C848" }} />
              <Typography variant="h6" gutterBottom>
                Register Employee
              </Typography>
              <Typography>Register new employees and assign roles.</Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href="register-employee"
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
