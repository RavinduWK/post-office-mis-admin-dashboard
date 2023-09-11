import React from "react";
import { Box } from "@mui/material";
import MailForm from "../normalpost/MailForm";

const RegisterEmployee = () => {
  return (
    <div>
      <h1>Register Employee</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <MailForm />
      </Box>
    </div>
  );
};

export default RegisterEmployee;
