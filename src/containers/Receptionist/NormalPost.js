import React, { useState } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/Form/MailForm";
import CostCalculator from "../../components/Form/CostCalculator";
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
import LoadingScreen from "../Common/LoadingScreen";

const NormalPost = () => {
  const navigate = useNavigate();
  const [securityNumber, setSecurityNumber] = useState("<Not Applicable>");
  const [cost, setCost] = useState("");
  const [loading, setLoading] = useState(false);

  const recipientFields = [
    fieldsData.recipientName,
    fieldsData.recipientCity,
    fieldsData.recipientAddress,
  ];

  const transactionFields = [fieldsData.cost];

  const handleSubmit = async (formState) => {
    setLoading(true);
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
        state: { mailId, securityNumber, cost: formState.cost, type },
      });
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
          formTitle="Normal Post"
          fieldsGroups={[
            { label: "Recipient's Details", fields: recipientFields },
            { label: "Transaction Details", fields: transactionFields },
          ]}
          selectionGroups={[]}
          onFormSubmit={handleSubmit}
        />
        <CostCalculator mailType="normal" />
      </Box>
    </div>
  );
};

export default NormalPost;
