import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const StatBox = ({ title, value, style }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayValue < value) {
        setDisplayValue((prevValue) => prevValue + Math.ceil(value / 100));
      } else {
        clearInterval(interval);
        setDisplayValue(value);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [value, displayValue]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "16px",
        width: "250px",
        height: "120px",
        textAlign: "center",
        margin: "8px",
        ...style,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", my: "5px" }}>
        {title}
      </Typography>
      <Typography variant="h3">{displayValue}</Typography>
    </Box>
  );
};

export default StatBox;
