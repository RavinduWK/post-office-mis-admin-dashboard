import React from "react";
import Box from "@mui/material/Box";
import { Typography, Button, GlobalStyles } from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextField";
import CustomFormControl from "./CustomComponents/CustomFormControl";

function BillForm({ formTitle, fieldsGroups, selectionGroups, onSubmit }) {
  const [formState, setFormState] = React.useState({});

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <CustomTextField
            label={field.label}
            id={field.id}
            required
            key={field.id}
            value={formState[field.id] || ""}
            onChange={handleChange(field.id)}
          />
        );
      case "formControl":
        return (
          <CustomFormControl
            label={field.label}
            id={field.id}
            options={field.options}
            value={formState[field.id] || ""}
            onChange={handleChange(field.id)}
            key={field.id}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
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
        onSubmit={handleSubmit}
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": { backgroundColor: "white" },
          }}
        />
        {fieldsGroups.map((group, index) => (
          <React.Fragment key={index}>
            {group.fields.map(renderField)}
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
          type="submit"
          variant="contained"
          sx={{
            my: "40px",
            backgroundColor: "#852318",
            color: "white",
            px: 8,
            fontSize: "14px",
            borderRadius: "6px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
export default BillForm;
