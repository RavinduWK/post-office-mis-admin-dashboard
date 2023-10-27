import React, { useState } from "react";
import { Box } from "@mui/material";
import MailForm from "../../components/Form/MailForm";
import CostCalculator from "../../components/Form/CostCalculator";
import { generateRandomString } from "../../utils/SecurityCode";
import { fieldsData, postOfficeID } from "../../data/formFields";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../Common/LoadingScreen";
import {
  createMoneyOrder,
  fetchUserID,
  getLatestMailId,
  updateLatestMailId,
} from "../../data/databaseFunctions";

const MoneyOrder = () => {
  const navigate = useNavigate();
  const [securityNumber, setSecurityNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const senderFields = [fieldsData.senderName, fieldsData.senderNIC];

  const recipientFields = [fieldsData.recipientName, fieldsData.recipientNIC];

  const transactionFields = [fieldsData.cost, fieldsData.transferAmount];

  const postOfficeFields = [
    postOfficeID.acceptedPostofficeID,
    postOfficeID.destinationPostofficeID,
  ];

  const handleSubmit = async (formState) => {
    setLoading(true);
    try {
      const newId = await getLatestMailId();
      const receptionistID = await fetchUserID();
      const type = "money order";
      const mailId = `14${newId}`;
      const securityNumber = generateRandomString(10);

      await createMoneyOrder(
        mailId,
        formState,
        type,
        receptionistID,
        securityNumber
      );
      await updateLatestMailId(newId);
      setSecurityNumber(securityNumber);
      console.log("Document successfully written with ID: ", mailId);
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
          formTitle="Money Order"
          fieldsGroups={[
            { label: "Sender's Details", fields: senderFields },
            { label: "Recipient's Details", fields: recipientFields },
            { label: "Transaction Details", fields: transactionFields },
            { label: "PostOffice Deatils", fields: postOfficeFields },
          ]}
          selectionGroups={[]}
          onFormSubmit={handleSubmit}
        />
        <CostCalculator mailType="MoneyOrder" />
      </Box>
    </div>
  );
};

export default MoneyOrder;
