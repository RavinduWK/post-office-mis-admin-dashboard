import React from "react";
import { Typography, Box, useTheme, Button, GlobalStyles } from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextField";
import CustomFormControl from "./CustomComponents/CustomFormControl";

function MailForm({ formTitle, fieldsGroups, selectionGroups, onFormSubmit }) {
  const [formState, setFormState] = React.useState({});
  const theme = useTheme();

  const handleSubmit = () => {
    if (typeof onFormSubmit === "function") {
      onFormSubmit(formState);
    } else {
      console.error("onFormSubmit is not a function");
    }
  };

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        backgroundColor: theme.palette.background.applicationForm,
        borderRadius: "10px",
        padding: "30px 2px 30px 2px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.palette.text.typography,
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
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": {
              backgroundColor: theme.palette.text.typography,
            },
          }}
        />
        {fieldsGroups.map((group, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.text.typography,
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
                value={formState[field.id] || ""}
                onChange={handleChange(field.id)}
              />
            ))}
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
