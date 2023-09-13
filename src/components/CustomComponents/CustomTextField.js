import React from "react";
import { TextField, GlobalStyles } from "@mui/material";

const CustomTextField = ({ label, id, required = false }) => {
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
        required={required}
        id={id}
        label={label}
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
    </div>
  );
};

export default CustomTextField;
