import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CustomFormControl = ({ label, id, options, value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 550, backgroundColor: "#F0F0F0" }}>
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
