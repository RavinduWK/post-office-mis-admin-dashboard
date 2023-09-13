import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";

const NormalPost = () => {
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
          selectionGroups={[{ fields: postOfficeFields }]}
          onSubmit={handleSubmit}
        />
        <CostCalculator />
      </Box>
    </div>
  );
};

export default NormalPost;