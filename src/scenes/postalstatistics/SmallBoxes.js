import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const StatBox = ({ title, value, style }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayValue < value) {
        setDisplayValue((prevValue) => prevValue + Math.ceil(value / 100));
      } else {
        clearInterval(interval);
        setDisplayValue(value);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [value, displayValue]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "16px",
        width: "250px",
        height: "120px",
        textAlign: "center",
        margin: "8px",
        ...style,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", my: "5px" }}>
        {title}
      </Typography>
      <Typography variant="h3">{displayValue}</Typography>
    </Box>
  );
};

const SmallBoxes = () => {
  const totalCustomers = 5000;
  const totalRevenue = 20000;
  const totalEmployees = 60;
  const totalregisteredAddresses = 2000;
  const totalAreasCovered = 10;
  const totalTransactions = 45;

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <StatBox title="Employees" value={totalEmployees} />
        <StatBox title="Customers" value={totalCustomers} />
        <StatBox title="Covered areas" value={totalAreasCovered} />
        <StatBox
          title="Revenue"
          value={totalRevenue}
          style={{ border: "1px solid black", backgroundColor: "#f2c848" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <StatBox title="Customers" value={totalCustomers} />
        <StatBox title="Customers" value={totalCustomers} />
        <StatBox title="Registerd addresses" value={totalregisteredAddresses} />
        <StatBox
          title="Transactions"
          value={totalTransactions}
          style={{ border: "1px solid black", backgroundColor: "#50C700" }}
        />
      </Box>
    </Box>
  );
};

export default SmallBoxes;
