import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

const CustomFormControl = ({ label, id, options, value, onChange }) => {
  const theme = useTheme();

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 550,
        backgroundColor: theme.palette.background.inputField,
      }}
    >
      <InputLabel id={id} sx={{ fontSize: "16px" }}>
        {label}
      </InputLabel>
      <Select
        sx={{ fontSize: "16px" }}
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomFormControl;
