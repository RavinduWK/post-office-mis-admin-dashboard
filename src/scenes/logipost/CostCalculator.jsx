import React from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  GlobalStyles,
} from "@mui/material";

const CostCalculator = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
        height: "400px",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "15 5 5 0",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          marginTop: "20px",
          marginBottom: "10px",
          color: "#852318",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Cost Calculator
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, minWidth: 200 },
        }}
        noValidate
        autoComplete="off"
      >
        <GlobalStyles
          styles={{
            ".MuiInputLabel-root.Mui-focused": {
              backgroundColor: "white",
            },
          }}
        />
        <div>
          <TextField
            required
            id="outlined-required"
            label="Mail Weight (g)"
            style={{ backgroundColor: "#F0F0F0" }}
          />
        </div>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#852318", color: "white", mt: 4, px: 5 }}
        >
          Calculate
        </Button>
      </Box>

      {/* Adding Divider here */}
      <Divider
        sx={{
          marginTop: 10,
          marginBottom: 2,
          width: "100%", // Make it full width
        }}
      />

      <h2>Rs.50.00</h2>
    </Box>
  );
};

export default CostCalculator;
