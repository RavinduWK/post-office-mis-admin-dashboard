import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, useTheme, Grid } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PaymentIcon from "@mui/icons-material/Payment";
import FastForwardIcon from "@mui/icons-material/FastForward";
import MoneyIcon from "@mui/icons-material/Money";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { auth } from "../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import DashboardButton from "../../components/DashboardButton";

const DashboardRecipient = () => {
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
          Receptionist Dashboard
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
        {/* Normal Post */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<MailIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Normal Post"
            description="Handle all regular postal requests."
            href="/receptionist/normal-post"
          />
        </Grid>

        {/* Registered Post */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<AssignmentIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Registered Post"
            description="Manage all registered post requests."
            href="/receptionist/registered-post"
          />
        </Grid>

        {/* Logi Post */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<MailIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Logi Post"
            description="Handle logistics and parcels."
            href="/receptionist/logi-post"
          />
        </Grid>

        {/* Fast Track Courier */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<FastForwardIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Fast Track Courier"
            description="Fast delivery services."
            href="/receptionist/fast-track-courier"
          />
        </Grid>

        {/* Pay Bills */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<PaymentIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Pay Bills"
            description="Assist customers in paying their bills."
            href="/receptionist/bill-payments"
          />
        </Grid>

        {/* Money Orders */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<MoneyIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Money Orders"
            description="Process and manage money orders."
            href="/receptionist/money-order"
          />
        </Grid>

        {/* Pay Money Orders */}
        <Grid item xs={12} md={4}>
          <DashboardButton
            icon={<MoneyIcon sx={{ fontSize: 60, color: "#F2C848" }} />}
            title="Pay Money Orders"
            description="Pay money orders to receivers."
            href="/receptionist/pay-money-order"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardRecipient;
