import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import { employeeRegisterData } from "../../data/formFields";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app, auth } from "../../config/firebase";

const handleSubmit = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.employeeEmail,
      formData.accountPassword
    );

    const user = userCredential.user;

    const db = getFirestore(app);
    await setDoc(doc(db, "employees", user.uid), {
      name: formData.employeeFullName,
      email: formData.employeeEmail,
      NIC: formData.employeeNIC,
      DOB: formData.employeeDateOfBirth,
      contact_number: formData.employeeContactNumber,
      role: formData.employeeRole,
    });

    console.log("User registered and data saved to Firestore");
    return Promise.resolve();
  } catch (error) {
    console.error("Error registering user:", error);
    return Promise.reject(error);
  }
};

const RegisterEmployee = () => {
  const allRoles = [
    { label: "Postmaster", value: 10 },
    { label: "Supervisor", value: 20 },
    { label: "Receptionist", value: 30 },
    { label: "Postman", value: 40 },
    { label: "Disparch Record Manager", value: 50 },
  ];

  const employeeFields = [
    employeeRegisterData.employeeFullName,
    employeeRegisterData.employeeNIC,
    employeeRegisterData.employeeEmail,
    employeeRegisterData.employeeDateOfBirth,
    employeeRegisterData.employeeContactNumber,
    employeeRegisterData.accountPassword,
  ];

  const employeeRoleField = [
    {
      ...employeeRegisterData.employeeRole,
      options: allRoles,
    },
  ];

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
          selectionGroups={[{ fields: employeeRoleField }]}
          onSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
};

export default RegisterEmployee;
