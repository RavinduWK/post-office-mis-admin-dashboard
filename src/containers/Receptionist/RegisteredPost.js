import React, { useState } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";
import { generateRandomString } from "../../utils/SecurityCode";
import {
  getLatestMailId,
  createMailItem,
  getAssignedPostman,
} from "../../data/databaseFunctions";

const RegisteredPost = () => {
  const navigate = useNavigate();
  const [securityNumber, setSecurityNumber] = useState("");

  const senderFields = [
    fieldsData.senderName,
    // fieldsData.senderDistrict,
    fieldsData.senderCity,
    fieldsData.senderAddress,
  ];

  const recipientFields = [
    fieldsData.recipientName,
    // fieldsData.recipientDistrict,
    fieldsData.recipientCity,
    fieldsData.recipientAddress,
  ];

  const transactionFields = [fieldsData.cost];

  const handleSubmit = async (formState) => {
    try {
      const newId = await getLatestMailId();

      const assignedPostman = await getAssignedPostman(
        formState.recipient_address_id
      );
      console.log("Assigned Postman ID: " + assignedPostman);

      const type = "registered post";
      const mailId = `11${newId}`;
      const securityNumber = generateRandomString(10);

      await createMailItem(
        mailId,
        formState,
        type,
        assignedPostman,
        securityNumber
      );

      setSecurityNumber(securityNumber);
      console.log("Document successfully written with ID: " + mailId);
      navigate("success", {
        state: { mailId, securityNumber, cost: formState.cost },
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
          formTitle="Registered Post"
          fieldsGroups={[
            { label: "Sender's Details", fields: senderFields },
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

export default RegisteredPost;
