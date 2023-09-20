import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, List, ListItem } from "@mui/material";
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
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Subscribe to Firestore updates for address suggestions
    const fetchAddressesByCity = async () => {
      if (recipientCity) {
        const q = query(
          collection(db, "Address"),
          where("City", "==", recipientCity)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const suggestions = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const formattedAddress = `${data.HouseNo}, ${data.Address_line_1}, ${data.Address_line_2}, ${data.Address_line_3}, ${data.City}`;
            suggestions.push(formattedAddress);
          });
          setSuggestedAddresses(suggestions);
          setFilteredSuggestions(suggestions);
          setShowSuggestions(true);
        });

        // Clean up subscription when the component unmounts
        return () => unsubscribe();
      }
    };

    fetchAddressesByCity();
  }, [recipientCity]);

  const handleChange = (id) => (event) => {
    if (id === "recipient_city") {
      setRecipientCity(event.target.value);
    } else {
      setFormState({
        ...formState,
        [id]: event.target.value,
      });
    }
  };

  const handleAddressInput = (event) => {
    const inputText = event.target.value;
    setAddressInput(inputText);

    if (inputText === "") {
      // If the input is empty, reset suggestions to the full list or fetch based on City
      if (recipientCity) {
        setFilteredSuggestions(suggestedAddresses);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      // Filter suggestions based on input text
      const filteredSuggestions = suggestedAddresses.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputText.toLowerCase())
      );

      // Check if the filtered suggestions array is empty
      if (filteredSuggestions.length === 0) {
        // If no matching suggestions, reset to full list or fetch based on City
        if (recipientCity) {
          setFilteredSuggestions(suggestedAddresses);
        } else {
          setFilteredSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setFilteredSuggestions(filteredSuggestions); // Update filtered suggestions
        setShowSuggestions(true);
      }
    }
  };

  const handleAddressSelect = (address) => {
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

  return (
    <Box>
      <Typography variant="h4">{formTitle}</Typography>
      <Box>
        {fieldsGroups.map((group, index) => (
          <div key={index}>
            <Typography variant="subtitle2">{group.label}</Typography>
            {group.fields.map((field) => (
              <CustomTextField
                label={field.label}
                id={field.id}
                required
                key={field.id}
                value={formState[field.id] || ""}
                onChange={handleChange(field.id)}
              />
            ))}
          </div>
        ))}
        <Typography variant="subtitle2">Recipient's City</Typography>
        <CustomTextField
          label="Recipient's City"
          id="recipient_city"
          required
          value={recipientCity}
          onChange={handleChange("recipient_city")}
        />
        <Typography variant="subtitle2">Recipient's Address</Typography>
        <CustomTextField
          label="Recipient's Address"
          id="recipient_address"
          value={addressInput}
          onChange={handleAddressInput}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <Paper
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <List>
              {filteredSuggestions.map((address, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleAddressSelect(address)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {address}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default MailForm;
