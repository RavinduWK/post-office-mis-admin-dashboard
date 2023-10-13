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
  fetchUserID,
  fetchPostOfficeRegions,
  updateLatestMailId,
} from "../../data/databaseFunctions";

const RegisteredPost = () => {
  const navigate = useNavigate();
  const [securityNumber, setSecurityNumber] = useState("");
  const [cost, setCost] = useState("");

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
      // Get the latest ID from the "metadata" document
      const newId = await getLatestMailId();

      // Get the receptionist ID asynchronously
      const receptionistID = await fetchUserID();

      // Get the regions belong to the post office
      const postOfficeRegions = await fetchPostOfficeRegions();

      // Get the assigned postman
      const assignedPostman = await getAssignedPostman(
        formState.receiver_address_id,
        postOfficeRegions
      );

      // Create a new mail item with the new ID
      const type = "fast track courier";
      const mailId = `13${newId}`;
      const securityNumber = generateRandomString(10);

      await createMailItem(
        mailId,
        formState,
        type,
        assignedPostman,
        receptionistID,
        postOfficeRegions,
        securityNumber
      );
      await updateLatestMailId(newId);
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
          formTitle="Fast Track Courier"
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
