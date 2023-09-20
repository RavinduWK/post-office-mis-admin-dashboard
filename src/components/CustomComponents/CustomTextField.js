import React from "react";
import { TextField, GlobalStyles } from "@mui/material";

const CustomTextField = ({
  suggestions = [],
  onSuggestionSelect,
  onAddressInput,
  label,
  id,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <GlobalStyles
        styles={{
          ".MuiInputLabel-root.Mui-focused": {
            backgroundColor: "white",
          },
        }}
      />
      <TextField
        onInput={(e) => onAddressInput(id, e)}
        required={required}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        style={{
          m: 1,
          minWidth: 550,
          backgroundColor: "#F0F0F0",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#696969",
            },
          },
        }}
        inputProps={{ style: { fontSize: 16 } }}
        InputLabelProps={{
          style: { fontSize: 17, color: "#696969" },
        }}
      />
      {suggestions.length > 0 && (
        <div>
          {suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => onSuggestionSelect(id, suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomTextField;
