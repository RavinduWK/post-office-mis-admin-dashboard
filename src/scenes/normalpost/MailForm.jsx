import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, GlobalStyles } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import CustomFormControl from "../../components/CustomFormControl";

function MailForm() {
  const [name, setName] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [acceptedPostOffice, setAcceptedPostOffice] = React.useState("");
  const [destinationPostOffice, setDestinationPostOffice] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
        district.trim() !== "" &&
        city.trim() !== "" &&
        address.trim() !== "" &&
        acceptedPostOffice !== "" &&
        destinationPostOffice !== ""
    );
  }, [
    name,
    district,
    city,
    address,
    acceptedPostOffice,
    destinationPostOffice,
  ]);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/receptionist/normal-post/success`);
  };

  const postOfficeOptions = [
    { label: "Matara", value: 10 },
    { label: "Galle", value: 20 },
    { label: "Colombo", value: 30 },
  ];

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
        Normal Post
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
        onSubmit={handleSubmit}
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": {
              backgroundColor: "white",
            },
          }}
        />

        <CustomTextField
          label="Receipient's Name"
          id="name"
          required
          value={name}
          onChange={handleChange(setName)}
        />
        <CustomTextField
          label="Receipient's District"
          id="district"
          required
          value={district}
          onChange={handleChange(setDistrict)}
        />
        <CustomTextField
          label="Receipient's City"
          id="city"
          required
          value={city}
          onChange={handleChange(setCity)}
        />
        <CustomTextField
          label="Receipient's Address"
          id="address"
          required
          value={address}
          onChange={handleChange(setAddress)}
        />
        <CustomFormControl
          label="Accepted PostOffice"
          id="accepted_post_office"
          options={postOfficeOptions}
          value={acceptedPostOffice}
          onChange={handleChange(setAcceptedPostOffice)}
        />
        <CustomFormControl
          label="Destination PostOffice"
          id="destination_post_office"
          options={postOfficeOptions}
          value={destinationPostOffice}
          onChange={handleChange(setDestinationPostOffice)}
        />
        <Button
          type="submit"
          variant="contained"
          // disabled={!isFormValid}
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
