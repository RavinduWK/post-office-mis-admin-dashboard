import { useEffect, useState } from "react";
import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/Form/MailForm";
import { employeeRegisterData } from "../../data/formFields";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const RegisterEmployee = () => {
  const allRoles = [
    { label: "Receptionist", value: "Receptionist" },
    { label: "Postman", value: "Postman" },
    { label: "Dispatch Record Manager", value: "Dispatch Record Manager" },
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

  const handleSubmit = async (formData) => {
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          process.env.REACT_APP_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.employee_email,
            password: formData.password,
            returnSecureToken: true,
          }),
        }
      );

      if (response.ok) {
        let data = await response.json();
        let idtoken = data.idToken;

        let user = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
            process.env.REACT_APP_API_KEY,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: idtoken }),
          }
        );

        if (user.ok) {
          let userData = await user.json();
          let uid = userData.users[0].localId;

          const employeeRef = doc(db, "employees", uid);
          await setDoc(employeeRef, {
            name: formData.employee_full_name,
            email: formData.employee_email,
            NIC: formData.employee_nic,
            DOB: formData.date_of_birth,
            contact_number: formData.employee_contact_number,
            role: formData.employee_role,
          });
          console.log(`Employee registered successfully! USer ID: ${uid}`);
        } else {
          console.log(user);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      // Handle errors
      console.error("Error registering user:", error);
    }
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
          selectionGroups={[{ fields: employeeRoleField }]}
          onSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
};

export default RegisterEmployee;
