import React from "react";
import { Box, Typography, Paper, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BillPayments = () => {
  const navigate = useNavigate();

  const billTypes = [
    { id: 1, name: "Electricity" },
    { id: 2, name: "Water" },
    { id: 3, name: "Internet" },
    { id: 4, name: "Gas" },
    { id: 5, name: "Mobile" },
  ];

  const handleTileClick = (billType) => {
    navigate(`/receptionist/bill-details/${billType}`);
  };

  return (
    <div>
      <h1>Bill Payments Content Here</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        flexWrap="wrap"
        p={2}
      >
        {billTypes.map((billType) => (
          <ButtonBase
            onClick={() => handleTileClick(billType.name)}
            key={billType.id}
          >
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                margin: "10px",
                textAlign: "center",
                width: "150px",
                height: "150px",
              }}
            >
              <Typography variant="h6">{billType.name}</Typography>
            </Paper>
          </ButtonBase>
        ))}
      </Box>
    </div>
  );
};

export default BillPayments;
