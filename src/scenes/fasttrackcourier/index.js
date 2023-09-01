import React from "react";
import { Box } from "@mui/material";
import MailForm from "./MailForm";
import CostCalculator from "./CostCalculator";

const FastTrackCourier = () => {
  return (
    <div>
      <h1>Fast Track Courier Content Here</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <MailForm />
        <CostCalculator />
      </Box>
    </div>
  );
};

export default FastTrackCourier;
