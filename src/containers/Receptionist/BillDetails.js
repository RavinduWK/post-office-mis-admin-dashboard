import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import BillForm from "../../components/BillForm";
import { useParams } from "react-router-dom";
import { billPaymentData, postOfficeData } from "../../data/formFields";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = () => {
    console.log("Form submitted!");
    navigate("completed");
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
