import React, { useState } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";
import {
  getLatestMailId,
  createMailItem,
  getAssignedPostman,
  fetchUserID,
  fetchPostOfficeRegions,
  updateLatestMailId,
} from "../../data/databaseFunctions"; // Import database service functions

const NormalPost = () => {
  const navigate = useNavigate();
  const [securityNumber, setSecurityNumber] = useState("-------------");
  const [cost, setCost] = useState("");

  const recipientFields = [
    fieldsData.recipientName,
    fieldsData.recipientCity,
    fieldsData.recipientAddress,
  ];

  const transactionFields = [fieldsData.cost];

  const handleSubmit = async (formState) => {
    try {
      // Step 1: Get the latest ID from the "metadata" document
      const newId = await getLatestMailId();

      // Step 2: Get the receptionist ID asynchronously
      const receptionistID = await fetchUserID();

      //Get the regions belong to the post office
      const postOfficeRegions = await fetchPostOfficeRegions();

      // Step 3: Get the assigned postman
      const assignedPostman = await getAssignedPostman(
        formState.recipient_address_id,
        postOfficeRegions
      );
      console.log("Assigned Postman ID: " + assignedPostman);
      console.log("region", postOfficeRegions);
      // Step 4: Create a new mail item with the new ID
      const type = "normal post";
      const mailId = `10${newId}`;
      await createMailItem(
        mailId,
        formState,
        type,
        assignedPostman,
        receptionistID,
        postOfficeRegions
      );
      await updateLatestMailId(newId);
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
