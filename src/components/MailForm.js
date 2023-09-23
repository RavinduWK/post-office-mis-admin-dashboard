import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  GlobalStyles,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextField";
import CustomFormControl from "./CustomComponents/CustomFormControl";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

function MailForm({ formTitle, fieldsGroups, selectionGroups, onFormSubmit }) {
  const [formState, setFormState] = useState({});
  const [recipientCity, setRecipientCity] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderSuggestedAddresses, setSenderSuggestedAddresses] = useState([]);
  const [recipientSuggestedAddresses, setRecipientSuggestedAddresses] =
    useState([]);
  const [senderAddressInput, setSenderAddressInput] = useState("");
  const [recipientAddressInput, setRecipientAddressInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressType, setAddressType] = useState(null);

  useEffect(() => {
    const fetchAddressesByCity = async (city, type) => {
      if (city) {
        const q = query(collection(db, "Address"), where("City", "==", city));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const suggestions = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const formattedAddress = `${data.HouseNo}, ${data.Address_line_1}, ${data.Address_line_2}, ${data.City}`;
            suggestions.push(formattedAddress);
          });

          // Check the type to set the correct suggestions
          if (type === "recipient") {
            setRecipientSuggestedAddresses(suggestions);
            setFilteredSuggestions(suggestions);
            setShowSuggestions(true);
          } else {
            setSenderSuggestedAddresses(suggestions);
          }

          setFilteredSuggestions(suggestions);
          setShowSuggestions(true);
        });

        return () => unsubscribe();
      }
    };

    fetchAddressesByCity(recipientCity, "recipient");
    fetchAddressesByCity(senderCity, "sender");
  }, [recipientCity, senderCity]);

  const handleChange = (id) => (event) => {
    const value = event.target.value;
    if (id === "recipient_city") {
      setAddressType("recipient");
      setRecipientCity(value);
    } else if (id === "sender_city") {
      setAddressType("sender");
      setSenderCity(value);
    } else {
      setFormState({
        ...formState,
        [id]: event.target.value,
      });
    }
  };

  const handleAddressInput = (event) => {
    const inputText = event.target.value;
    const type = addressType;

    if (type === "recipient") {
      setRecipientAddressInput(inputText);
    } else {
      setSenderAddressInput(inputText);
    }

    let currentSuggestedAddresses = [];
    if (type === "recipient") {
      currentSuggestedAddresses = recipientSuggestedAddresses;
    } else {
      currentSuggestedAddresses = senderSuggestedAddresses;
    }

    if (inputText === "") {
      // If the input is empty, reset suggestions to the full list or fetch based on City
      setFilteredSuggestions(currentSuggestedAddresses);
      if (!currentSuggestedAddresses.length) {
        setShowSuggestions(false);
      }
    } else {
      // Filter suggestions based on input text
      const newFilteredSuggestions = currentSuggestedAddresses.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(inputText.toLowerCase())
      );

      if (newFilteredSuggestions.length === 0) {
        // If no matching suggestions, reset to full list or hide
        setShowSuggestions(false);
      } else {
        setFilteredSuggestions(newFilteredSuggestions);
        setShowSuggestions(true);
      }
    }
  };

  const handleAddressSelect = (address) => {
    if (addressType === "recipient") {
      setRecipientAddressInput(address);

      setFormState((prevState) => ({
        ...prevState,
        recipient_address: address,
      }));
    } else {
      setSenderAddressInput(address);

      setFormState((prevState) => ({
        ...prevState,
        sender_address: address,
      }));
    }
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (typeof onFormSubmit === "function") {
      onFormSubmit(formState);
    } else {
      console.error("onFormSubmit is not a function");
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
          display: "flex", //one
          flexDirection: "column", //two
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, minWidth: 500, fontSize: "20px" },
        }}
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": { backgroundColor: "white" },
          }}
        />
        {fieldsGroups.map((group, index) => (
          <div key={index}>
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
              <div key={field.id}>
                <CustomTextField
                  label={field.label}
                  id={field.id}
                  required
                  key={field.id}
                  value={
                    field.id === "recipient_city"
                      ? recipientCity
                      : field.id === "sender_city"
                      ? senderCity
                      : field.id === "recipient_address"
                      ? recipientAddressInput
                      : field.id === "sender_address"
                      ? senderAddressInput
                      : formState[field.id] || ""
                  }
                  onChange={
                    field.id === "recipient_city" || field.id === "sender_city"
                      ? handleChange(field.id)
                      : field.id === "recipient_address" ||
                        field.id === "sender_address"
                      ? handleAddressInput
                      : handleChange(field.id)
                  }
                  onFocus={() => {
                    setShowSuggestions(true);
                    if (field.id === "recipient_address")
                      setAddressType("recipient");
                    else if (field.id === "sender_address")
                      setAddressType("sender");
                  }}
                  onBlur={() => setShowSuggestions(false)}
                />
                {
                  // If suggestions should show for this field, display them
                  showSuggestions &&
                    ((field.id === "recipient_address" &&
                      addressType === "recipient") ||
                      (field.id === "sender_address" &&
                        addressType === "sender")) &&
                    filteredSuggestions.length > 0 && (
                      <Paper
                        style={{
                          position: "relative",
                          zIndex: 1,
                          width: "100%",
                          borderRadius: "4px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        <List>
                          {filteredSuggestions.map((address, index) => (
                            <ListItem
                              key={index}
                              onClick={() => handleAddressSelect(address)}
                              style={{
                                cursor: "pointer",
                                padding: "10px 15px",
                                "&:hover": {
                                  backgroundColor: "#f7f7f7",
                                },
                              }}
                            >
                              {address}
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )
                }
              </div>
            ))}
          </div>
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
