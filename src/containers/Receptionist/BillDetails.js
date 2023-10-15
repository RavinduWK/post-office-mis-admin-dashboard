import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import BillForm from "../../components/Form/BillForm";
import { useParams } from "react-router-dom";
import { billPaymentData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../config/firebase";
import { generateRandomString } from "../../utils/SecurityCode";

const BillDetails = () => {
  const [serviceProviderOptions, setServiceProviderOptions] = useState([]);
  const { billType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let options = [];
    switch (billType) {
      case "Electricity":
        options = [
          { label: "CEB", value: 10 },
          { label: "LECO", value: 20 },
        ];
        break;
      case "Water":
        options = [
          { label: "Water Board", value: 30 },
          { label: "WPPC", value: 40 },
        ];
        break;
      case "Gas":
        options = [
          { label: "LP-Gas", value: 50 },
          { label: "Laugh-Gas", value: 60 },
        ];
        break;
      case "Mobile":
        options = [
          { label: "SLT", value: 50 },
          { label: "Dialog", value: 60 },
          { label: "Mobitel", value: 70 },
          { label: "Hutch", value: 80 },
          { label: "Airtel", value: 90 },
        ];
        break;
      default:
        options = [];
    }
    setServiceProviderOptions(options);
  }, [billType]);

  const fieldsGroups = [
    {
      label: "Customer Details",
      fields: [
        billPaymentData.customerName,
        billPaymentData.customerDistrict,
        billPaymentData.customerCity,
        billPaymentData.customerAddress,
      ],
    },
    {
      label: "Bill Details",
      fields: [
        {
          ...billPaymentData.serviceProvider,
          options: serviceProviderOptions,
        },
        billPaymentData.billAccountNumber,
        billPaymentData.payingAmount,
      ],
    },
  ];

  const selectionFields = [postOfficeData.acceptedPostOffice];

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
      const mailId = `${newId}MO`;
      await setDoc(doc(db, "MailServiceItems", mailId), {
        ...formState,
        type: "money order",
        paid: false,
        security_number: generateRandomString(10), // Generate a random 10-digit security number
      });

      console.log("Document successfully written with ID: ", mailId);
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
        <BillForm
          formTitle="Bill Payment"
          fieldsGroups={fieldsGroups}
          selectionGroups={[{ fields: selectionFields }]}
          onSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
};

export default BillDetails;
