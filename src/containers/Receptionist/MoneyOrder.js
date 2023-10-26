import React, { useState } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/Form/MailForm";
import CostCalculator from "../../components/Form/CostCalculator";
import { generateRandomString } from "../../utils/SecurityCode";
import { fieldsData, postOfficeData } from "../../data/formFields";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../config/firebase";
import LoadingScreen from "../Common/LoadingScreen";

const MoneyOrder = () => {
  const senderFields = [fieldsData.senderName, fieldsData.senderNIC];

  const recipientFields = [fieldsData.recipientName, fieldsData.recipientNIC];

  const transactionFields = [fieldsData.cost, fieldsData.transferAmount];

  const postOfficeFields = [
    postOfficeData.acceptedPostOffice,
    postOfficeData.destinationPostOffice,
  ];
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formState) => {
    setLoading(true);
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
      const mailId = `${newId}MO`;
      await setDoc(doc(db, "MailServiceItem", mailId), {
        ...formState,
        type: "money order",
        paid: false,
        security_number: generateRandomString(10), // Generate a random 10-digit security number
      });

      console.log("Document successfully written with ID: ", mailId);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <MailForm
          formTitle="Money Order"
          fieldsGroups={[
            { label: "Sender's Details", fields: senderFields },
            { label: "Recipient's Details", fields: recipientFields },
            { label: "Transaction Details", fields: transactionFields },
          ]}
          selectionGroups={[{ fields: postOfficeFields }]}
          onFormSubmit={handleSubmit}
        />
        <CostCalculator mailType="MoneyOrder" />
      </Box>
    </div>
  );
};

export default MoneyOrder;
