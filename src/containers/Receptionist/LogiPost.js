import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../config/firebase";
import { generateRandomString } from "../../utils/SecurityCode";

const LogiPost = () => {
  const navigate = useNavigate();

  const senderFields = [
    fieldsData.senderName,
    fieldsData.senderDistrict,
    fieldsData.senderCity,
    fieldsData.senderAddress,
  ];

  const recipientFields = [
    fieldsData.recipientName,
    fieldsData.recipientDistrict,
    fieldsData.recipientCity,
    fieldsData.recipientAddress,
  ];

  const transactionFields = [fieldsData.cost];

  const postOfficeFields = [
    postOfficeData.acceptedPostOffice,
    postOfficeData.destinationPostOffice,
  ];

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
      const mailId = `12${newId}`;
      await setDoc(doc(db, "MailServiceItems", mailId), {
        ...formState,
        type: "logi post",
        security_number: generateRandomString(10),
      });

      console.log("Document successfully written with ID: ", mailId);
      navigate("success");
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
          formTitle="Logi Post"
          fieldsGroups={[
            { label: "Sender's Details", fields: senderFields },
            { label: "Recipient's Details", fields: recipientFields },
            { label: "Transaction Details", fields: transactionFields },
          ]}
          selectionGroups={[{ fields: postOfficeFields }]}
          onFormSubmit={handleSubmit}
          addressSuggestionsFields={["recipient_city", "recipient_address"]}
        />
        <CostCalculator />
      </Box>
    </div>
  );
};

export default LogiPost;
