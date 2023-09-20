import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, GlobalStyles } from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextField";
import CustomFormControl from "./CustomComponents/CustomFormControl";
import { useAddressSuggestions } from "../utils/AddressSuggestions";

function MailForm({ formTitle, fieldsGroups, selectionGroups, onFormSubmit }) {
  const [formState, setFormState] = React.useState({});
  const [senderCity, setSenderCity] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const senderAddressSuggestions = useAddressSuggestions(senderCity);
  const recipientAddressSuggestions = useAddressSuggestions(recipientCity);

  const handleAddressInput = (id, event) => {
    const inputText = event.target.value;
    setAddressInput(inputText);
    const currentSuggestions =
      id === "sender_address"
        ? senderAddressSuggestions
        : recipientAddressSuggestions;

    if (inputText === "") {
      if (id.endsWith("city")) {
        setFilteredSuggestions(currentSuggestions);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      const filteredSuggestions = currentSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputText.toLowerCase())
      );

      if (filteredSuggestions.length === 0) {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      } else {
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      }
    }
  };

  const handleAddressSelect = (id, address) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: address,
    }));
    setAddressInput(address);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (typeof onFormSubmit === "function") {
      onFormSubmit(formState);
    } else {
      console.error("onFormSubmit is not a function");
    }
  };

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });

    if (id === "sender_city") {
      setSenderCity(event.target.value);
    } else if (id === "recipient_city") {
      setRecipientCity(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "30px 2px 30px 2px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "#852318",
          fontWeight: "bold",
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {formTitle}
      </Typography>
      <Box
        component="form"
        sx={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, minWidth: 500, fontSize: "20px" },
        }}
        noValidate
        autoComplete="off"
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": { backgroundColor: "white" },
          }}
        />
        {fieldsGroups.map((group, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#852318",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "5px",
                textAlign: "left",
                width: "98%",
                marginTop: index !== 0 ? "10px" : "0px",
              }}
            >
              {group.label}
            </Typography>
            {group.fields.map((field) => (
              <React.Fragment key={field.id}>
                <CustomTextField
                  label={field.label}
                  id={field.id}
                  required
                  value={formState[field.id] || ""}
                  onAddressInput={handleAddressInput}
                  onSuggestionSelect={handleAddressSelect}
                  onChange={handleChange(field.id)}
                  suggestions={showSuggestions ? filteredSuggestions : []}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <Box
          sx={{
            my: "15px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#C2C2C2",
              margin: "0 10px",
            }}
          ></Box>
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#C2C2C2",
              margin: "0 10px",
            }}
          ></Box>
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#C2C2C2",
              margin: "0 10px",
            }}
          ></Box>
        </Box>
        {selectionGroups.map((group, index) => (
          <React.Fragment key={index}>
            {group.fields.map((field) => (
              <CustomFormControl
                label={field.label}
                id={field.id}
                options={field.options}
                value={formState[field.id] || ""}
                onChange={handleChange(field.id)}
                key={field.id}
              />
            ))}
          </React.Fragment>
        ))}
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
export default MailForm;
