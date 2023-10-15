import React from "react";
import { Box } from "@mui/material";
import StatBox from "./StatBox";

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
