import React from "react";
import { TextField, GlobalStyles, useTheme } from "@mui/material";

const CustomTextField = ({ label, id, required = false, value, onChange }) => {
  const theme = useTheme();

  return (
    <div>
      <GlobalStyles
        styles={{
          ".MuiInputLabel-root.Mui-focused": {
            backgroundColor: "#fff",
            color: "fff",
          },
        }}
      />
      <TextField
        required={required}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        style={{
          m: 1,
          minWidth: 550,
          backgroundColor: theme.palette.background.inputField,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.background.inputField,
            },
          },
        }}
        inputProps={{ style: { fontSize: 16 } }}
        InputLabelProps={{
          style: { fontSize: 17 },
        }}
      />
    </div>
  );
};

export default CustomTextField;
