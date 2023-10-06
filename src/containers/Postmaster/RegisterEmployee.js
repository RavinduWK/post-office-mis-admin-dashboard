import { useEffect, useState } from "react";
import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import { employeeRegisterData } from "../../data/formFields";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const RegisterEmployee = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    // Add an authentication state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        // User is authenticated, their ID is available
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  const getPrefixForRole = (role) => {
    // Map roles to prefixes as needed
    switch (role) {
      case "Postmaster":
        return "PM";
      case "Supervisor":
        return "SP";
      case "Receptionist":
        return "RC";
      case "Postman":
        return "PT";
      case "Dispatch Record Manager":
        return "DM";
      default:
        return ""; // Default empty prefix
    }
  };

  const generateEmployeeID = async (role) => {
    // Get the latest employee counter for the specified role
    const counterRef = doc(db, "employeeCounters", role);
    const counterDoc = await getDoc(counterRef);
    let currentCount = 1; // Default value if counter doesn't exist

    if (counterDoc.exists()) {
      currentCount = counterDoc.data().count;
    }

    // Increment the counter
    const newCount = currentCount + 1;
    await setDoc(counterRef, { count: newCount });

    // Generate the employee ID with the specified format
    const prefix = getPrefixForRole(role);
    const paddedCount = newCount.toString().padStart(3, "0");
    const employeeID = `${prefix}${paddedCount}`;
    console.log("Generated Employee ID:", employeeID);
    return employeeID;
  };

  const handleSubmit = async (formData) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formData.employee_email,
        formData.password
      );

      if (user && user.uid) {
        // User is authenticated, their ID is available
        alert("Account created!");

        // Generate the employee ID based on the role
        const employeeID = await generateEmployeeID(formData.employee_role);
        console.log("Employee ID for Firestore:", employeeID);

        // Create user data to store in Firestore
        const userData = {
          employeeID: employeeID,
          name: formData.employee_full_name,
          email: formData.employee_email,
          NIC: formData.employee_nic,
          DOB: formData.date_of_birth,
          contact_number: formData.employee_contact_number,
          role: formData.employee_role,
        };

        // Create a Firestore document with the user's UID as the document ID
        const userDocRef = doc(db, "employees", user.uid);

        // Use setDoc to create or overwrite the document
        await setDoc(userDocRef, userData);

        console.log("User registered and data saved to Firestore");
      } else {
        console.error("User not registered.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error registering user:", error.message);
    }
  };

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
          onFormSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
};

export default RegisterEmployee;
