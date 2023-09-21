import React, { useState, useEffect } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase"; // Update with the path to your config file

const AddressInput = ({ city, label, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [addressInput, setAddressInput] = useState("");

  useEffect(() => {
    if (city) {
      // Query Firestore for matching addresses based on city
      const q = query(collection(db, "Address"), where("City", "==", city));

      getDocs(q).then((querySnapshot) => {
        const fetchedAddresses = [];
        querySnapshot.forEach((doc) => {
          const addressData = doc.data();
          fetchedAddresses.push(
            `${addressData.HouseNo}, ${addressData.Address_line_1}, ${addressData.Address_line_2}, ${addressData.Address_line_3}, ${addressData.City}`
          );
        });
        setSuggestions(fetchedAddresses);
      });
    }
  }, [city]);

  const onSuggestionClick = (suggestion) => {
    setAddressInput(suggestion);
    setSuggestions([]);
    if (onChange) onChange(suggestion);
  };

  return (
    <div className="address-input-container">
      <label>{label}</label>
      <input
        type="text"
        value={addressInput}
        onChange={(e) => {
          setAddressInput(e.target.value);
          if (onChange) onChange(e.target.value);
          // Filter suggestions
          setSuggestions(
            suggestions.filter((addr) =>
              addr.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
        }}
      />
      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion}
            className="suggestion-item"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>

      <style jsx>{`
        .address-input-container {
          position: relative;
        }
        .suggestions-list {
          position: absolute;
          width: 100%;
          border: 1px solid #ccc;
          max-height: 150px;
          overflow-y: auto;
        }
        .suggestion-item {
          padding: 8px;
          cursor: pointer;
          background-color: #fff;
        }
        .suggestion-item:hover {
          background-color: #e6e6e6;
        }
      `}</style>
    </div>
  );
};

export default AddressInput;
