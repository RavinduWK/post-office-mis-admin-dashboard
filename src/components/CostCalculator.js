import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  GlobalStyles,
} from "@mui/material";

const CostCalculator = () => {
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState(null);

  const dummyData = [
    { minWeight: 0, maxWeight: 100, cost: 50 },
    { minWeight: 101, maxWeight: 200, cost: 70 },
    { minWeight: 201, maxWeight: 500, cost: 100 },
    { minWeight: 501, maxWeight: 1000, cost: 150 },
    // add more ranges as necessary
  ];

  const handleChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateCost = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) {
      alert("Please enter a valid weight");
      return;
    }

    const applicableRate = dummyData.find(
      (rate) => weightNum >= rate.minWeight && weightNum <= rate.maxWeight
    );

    if (applicableRate) {
      setCost(applicableRate.cost);
    } else {
      alert("No applicable rate found for the entered weight");
    }
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
            value={weight}
            onChange={handleChange}
          />
        </div>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#852318", color: "white", mt: 4, px: 5 }}
          onClick={calculateCost}
        >
          Calculate
        </Button>
      </Box>

      <Divider
        sx={{
          marginTop: 10,
          marginBottom: 2,
          width: "100%",
        }}
      />

      <h2>{cost !== null ? `Rs.${cost}.00` : ""}</h2>
    </Box>
  );
};

export default CostCalculator;
