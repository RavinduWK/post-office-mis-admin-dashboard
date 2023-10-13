import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, useTheme, Grid } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { auth } from "../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardButton from "../../components/DashboardButton";

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
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    // Convert 0-hour (midnight) to 12-hour format
    hours = hours ? hours : 12;

    const time = `${hours
      .toString()
      .padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

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
          style={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Supervisor Dashboard
        </Typography>
      </Box>
      <Box
        textAlign="right"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: theme.palette.text.typography }}
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
