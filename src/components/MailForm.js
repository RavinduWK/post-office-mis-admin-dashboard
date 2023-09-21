import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  GlobalStyles,
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
  const [senderAddressInput, setSenderAddressInput] = useState("");
  const [senderSuggestedAddresses, setSenderSuggestedAddresses] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const RecipientAddressRef = useRef(null);
  const senderAddressRef = useRef(null);

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
            const formattedAddress = `${data.HouseNo}, ${data.Address_line_1}, ${data.Address_line_2}, ${data.City}`;
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

    const fetchAddressesBySenderCity = async () => {
      if (senderCity) {
        const q = query(
          collection(db, "Address"),
          where("City", "==", senderCity)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const suggestions = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const formattedAddress = `${data.HouseNo}, ${data.Address_line_1}, ${data.Address_line_2}, ${data.City}`;
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

    fetchAddressesBySenderCity();
  }, [recipientCity, senderCity]);

  const handleChange = (id) => (event) => {
    const value = event.target.value;
    if (id === "recipient_city") {
      setRecipientCity(value);
    } else if (id === "sender_city") {
      setSenderCity(value);
    }

    // Updating formState for cities and other fields.
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleAddressInput = (type) => (event) => {
    const inputText = event.target.value;
    const currentCity = type === "recipient" ? recipientCity : senderCity;
    const setSuggestedAddressesFunc =
      type === "recipient"
        ? setSuggestedAddresses
        : setSenderSuggestedAddresses;
    const suggestedAddressesList =
      type === "recipient" ? suggestedAddresses : senderSuggestedAddresses;

    if (type === "recipient") {
      setAddressInput(inputText);
    } else {
      setSenderAddressInput(inputText);
    }

    if (inputText === "") {
      if (currentCity) {
        setFilteredSuggestions(suggestedAddressesList);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      const filteredSuggestions = suggestedAddressesList.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputText.toLowerCase())
      );

      if (filteredSuggestions.length === 0) {
        if (currentCity) {
          setFilteredSuggestions(suggestedAddressesList);
        } else {
          setFilteredSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      }
    }
    setFormState((prevState) => ({
      ...prevState,
      [type === "recipient" ? "recipient_address" : "sender_address"]:
        inputText,
    }));
  };

  const handleAddressSelect = (address) => {
    setAddressInput(address);
    setShowSuggestions(false);

    // Updating formState for selected address.
    setFormState((prevState) => ({
      ...prevState,
      recipient_address: address,
    }));
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
                    ? addressInput
                    : field.id === "sender_address"
                    ? senderAddressInput
                    : formState[field.id] || ""
                }
                onChange={
                  field.id === "recipient_city" || field.id === "sender_city"
                    ? handleChange(field.id)
                    : field.id === "recipient_address" ||
                      field.id === "sender_address"
                    ? handleAddressInput(field.id)
                    : handleChange(field.id)
                }
                {...(field.id === "recipient_address"
                  ? {
                      onFocus: () => setShowSuggestions(true),
                      onBlur: () => setShowSuggestions(false),
                      ref: RecipientAddressRef,
                    }
                  : field.id === "sender_address"
                  ? {
                      onFocus: () => setShowSuggestions(true),
                      onBlur: () => setShowSuggestions(false),
                      ref: senderAddressRef,
                    }
                  : {})}
              />
            ))}
          </div>
        ))}

        {showSuggestions && filteredSuggestions.length > 0 && (
          <Paper
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%", // match the width of your TextField
              top: RecipientAddressRef.current
                ? RecipientAddressRef.current.getBoundingClientRect().bottom
                : 0,
              left: RecipientAddressRef.current
                ? RecipientAddressRef.current.getBoundingClientRect().left
                : 0,
              borderRadius: "4px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // subtle shadow for better depth
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
        )}
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
