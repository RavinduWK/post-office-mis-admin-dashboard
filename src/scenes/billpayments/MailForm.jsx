import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography, Button, GlobalStyles } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import CustomFormControl from "../../components/CustomFormControl";

function MailForm(props) {
  const [age, setAge] = useState("");
  const [serviceProviderOptions, setServiceProviderOptions] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const postOfficeOptions = [
    { label: "Matara", value: 10 },
    { label: "Galle", value: 20 },
    { label: "Colombo", value: 30 },
  ];

  useEffect(() => {
    let options = [];
    switch (props.billType) {
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
  }, [props.billType]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "45%", // Adjusted width
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "30px 2px 30px 2px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "#852318", // Red color
          fontWeight: "bold", // Bold font weight
          fontSize: "30px", // Custom font size
          marginBottom: "10px",
        }}
      >
        Bill Payment
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column", // Stack form elements vertically
          alignItems: "center", // Center-align form elements horizontally
          "& .MuiTextField-root": { m: 1, minWidth: 500, fontSize: "20px" }, // Increased font size
        }}
        noValidate
        autoComplete="off"
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": {
              backgroundColor: "white",
            },
          }}
        />

        <CustomTextField label="Customer's Name" id="name" required />
        <CustomTextField label="Customer's District" id="district" required />
        <CustomTextField label="Customer's Address" id="city" required />
        <CustomFormControl
          label="Service Provider"
          id="service_provider"
          options={serviceProviderOptions}
          value={age}
          onChange={handleChange}
        />
        <CustomTextField label="Bill Account Number" id="city" required />
        <CustomTextField label="Paying Amount" id="address" required />
        <CustomFormControl
          label="Accepted PostOffice"
          id="accepted_post_office"
          options={postOfficeOptions}
          value={age}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          sx={{
            my: "40px",
            backgroundColor: "#852318",
            color: "white",
            px: 8,
            fontSize: "14px",
            borderRadius: "6px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default MailForm;
