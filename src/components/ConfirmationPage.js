import React from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  GlobalStyles,
} from "@mui/material";

function ConfirmationPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          height: "200px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "white",
          border: "1px solid #000",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          marginTop: "50px",
          lineHeight: "40px",
          fontSize: "20px",
        }}
      >
        <div>PID: 1230445</div>
        <div>Security Number: 124512412544</div>
      </Box>

      <Divider
        sx={{
          marginTop: 20,
          marginBottom: 2,
          border: "1px solid grey",
          width: "100%", // Make it full width
        }}
      />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "40px",
          "& .MuiTextField-root": { m: 1, minWidth: 600, fontSize: "20px" },
        }}
        noValidate
        autoComplete="off"
      >
        <GlobalStyles
          styles={{
            ".styled-textfield": {
              backgroundColor: "#F0F0F0",
              "& .MuiInputBase-input": {
                fontSize: "16px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                fontSize: "16px",
                backgroundColor: "#F0F0F0",
              },
            },
          }}
        />
        <div>
          <TextField
            className="styled-textfield"
            required
            id="outlined-required"
            label="Sender's email address"
          />
        </div>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#852318",
            color: "white",
            mt: 4,
            px: 5,
            textTransform: "none",
            marginLeft: "10px",
            fontSize: "16px", // Adjust the font size as needed
          }}
        >
          Send receipt through email
        </Button>

        <Divider
          sx={{
            marginTop: 10,
            marginBottom: 2,
            border: "1px solid grey",
            width: "100%", // Make it full width
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#852318",
            color: "white",
            mt: 4,
            px: 5,
            textTransform: "none",
            marginLeft: "10px",
            fontSize: "16px", // Adjust the font size as needed
          }}
        >
          Print receipt
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmationPage;
