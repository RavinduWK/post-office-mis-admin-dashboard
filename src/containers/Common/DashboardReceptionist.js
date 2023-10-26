import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, useTheme, Grid } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PaymentIcon from "@mui/icons-material/Payment";
import FastForwardIcon from "@mui/icons-material/FastForward";
import MoneyIcon from "@mui/icons-material/Money";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { auth } from "../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import DashboardButton from "../../components/Buttons/DashboardButton";
import { formatDateAndTime } from "../../services/dateAndTime";

const DashboardReceptionist = () => {
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
            Receptionist Dashboard
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

export default DashboardReceptionist;
