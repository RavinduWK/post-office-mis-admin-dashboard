import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import { employeeRegisterData } from "../../data/formFields";

const RegisterEmployee = () => {
  const employeeFields = [
    employeeRegisterData.employeeFullName,
    employeeRegisterData.employeeNIC,
    employeeRegisterData.employeeEmail,
    employeeRegisterData.employeeDateOfBirth,
    employeeRegisterData.employeeContactNumber,
    employeeRegisterData.accountPassword,
  ];

  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <MailForm
          formTitle="Employee Registration"
          fieldsGroups={[
            { label: "Employee's Details", fields: employeeFields },
          ]}
          selectionGroups={[]}
          onSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
};

export default RegisterEmployee;
