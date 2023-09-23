import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";

import {
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../config/firebase";
import { generateRandomString } from "../../utils/SecurityCode";

const NormalPost = () => {
  const navigate = useNavigate();
  const [securityNumber, setSecurityNumber] = useState(""); // Add state to store security number
  const [cost, setCost] = useState(""); // Add state to store cost

  const recipientFields = [
    fieldsData.recipientName,
    // fieldsData.recipientDistrict,
    fieldsData.recipientCity,
    fieldsData.recipientAddress,
  ];

  const transactionFields = [fieldsData.cost];

  const handleSubmit = async (formState) => {
    try {
      // Step 1: Get the latest ID from the "metadata" document
      const docRef = doc(db, "metadata", "mailService");
      const docSnap = await getDoc(docRef);

      let newId;
      if (docSnap.exists()) {
        // Increment the latest ID to generate a new ID
        newId = docSnap.data().latestId + 1;
      } else {
        // If the "metadata" document does not exist, initialize the ID to 100000
        newId = 100000;
      }

      // Step 2: Update the "metadata" document with the new ID
      await setDoc(docRef, { latestId: newId });

      // Step 3: Create a new mail item with the new ID
      const mailId = `10${newId}`;

      // Assuming you have the recipient_address_id in formState
      const recipientAddressId = formState.recipient_address_id;

      // Get the recipient address document
      const addressDocRef = doc(db, "Address", recipientAddressId);
      const addressDocSnapshot = await getDoc(addressDocRef);

      let assignedPostman = "";

      if (addressDocSnapshot.exists()) {
        // Get the RegionID from the recipient address document
        const recipientRegionId = addressDocSnapshot.data().RegionID;

        // Query the postmen collection for a postman with the matching RegionID
        const postmanQuery = query(
          collection(db, "employees"),
          where("role", "==", "postman"),
          where("region", "==", recipientRegionId)
        );
        const postmanQuerySnapshot = await getDocs(postmanQuery);

        if (postmanQuerySnapshot.docs.length > 0) {
          // Assuming there's only one matching postman, you can handle multiple matches differently
          const postmanDoc = postmanQuerySnapshot.docs[0];
          assignedPostman = postmanDoc.id;
        }
      }

      // Now you have the assigned postman ID based on the recipient's RegionID
      console.log("Assigned Postman ID:", assignedPostman);

      // Update the "assigned_postman" field in the mail item document
      await setDoc(doc(db, "MailServiceItem", mailId), {
        ...formState,
        type: "normal post",
        assigned_postman: assignedPostman,
        delivery_attempts: [],
        status: "Pending",
        timestamp: new Date(),
      });

      console.log("Document successfully written with ID: ", mailId);

      const securityNumber = generateRandomString(10); // Generate a security number
      const formCost = formState.cost;
      setSecurityNumber(securityNumber);
      setCost(formCost);
      console.log(cost);
      navigate("success", {
        state: { mailId, securityNumber, cost },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
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
          formTitle="Normal Post"
          fieldsGroups={[
            { label: "Recipient's Details", fields: recipientFields },
            { label: "Transaction Details", fields: transactionFields },
          ]}
          selectionGroups={[]}
          onFormSubmit={handleSubmit}
        />
        <CostCalculator />
      </Box>
    </div>
  );
};

export default NormalPost;
