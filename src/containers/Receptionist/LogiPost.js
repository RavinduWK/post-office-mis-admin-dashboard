import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = () => {
    console.log("Form submitted!");
    navigate("success");
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
          onSubmit={handleSubmit}
        />
        <CostCalculator />
      </Box>
    </div>
  );
};

export default LogiPost;
