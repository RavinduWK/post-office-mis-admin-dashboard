import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  useTheme,
  GlobalStyles,
} from "@mui/material";
import { fetchRatesForMailType } from "../../data/databaseFunctions";

const CostCalculator = ({ mailType }) => {
  const theme = useTheme();
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState(null);
  const [ratesData, setRatesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRatesForMailType(mailType);
      if (data) {
        let ratesArray = [];
        Object.entries(data).forEach(([key, value], index) => {
          const maxWeight = parseInt(key.split("<=")[1], 10);
          const minWeight = index > 0 ? ratesArray[index - 1].maxWeight + 1 : 0;
          ratesArray.push({ minWeight, maxWeight, cost: value });
        });
        setRatesData(ratesArray);
      }
    };
    fetchData();
  }, [mailType]);

  const handleChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateCost = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) {
      alert("Please enter a valid weight");
      return;
    }

    const applicableRate = ratesData.find(
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
        backgroundColor: theme.palette.background.applicationForm,
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
          color: theme.palette.text.typography,
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
            style={{ backgroundColor: theme.palette.background.inputField }}
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
