import React from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/MailForm";
import CostCalculator from "../../components/CostCalculator";
import { fieldsData, postOfficeData } from "../../data/formFields";

const MoneyOrder = () => {
  const senderFields = [fieldsData.senderName, fieldsData.senderNIC];

  const recipientFields = [fieldsData.recipientName, fieldsData.recipientNIC];

  const transactionFields = [fieldsData.cost, fieldsData.transferAmount];

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
          formTitle="Money Order"
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

export default MoneyOrder;
