import React from "react";
import { Box, Typography, Paper, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TungstenIcon from "@mui/icons-material/Tungsten";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import PropaneIcon from "@mui/icons-material/Propane";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";

const BillPayments = () => {
  const navigate = useNavigate();

  const billTypes = [
    {
      id: 1,
      name: "Electricity",
      icon: (
        <TungstenIcon
          sx={{
            fontSize: "10em",
            color: "yellow",
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Water",
      icon: (
        <WaterDropIcon
          sx={{
            fontSize: "10em",
            color: "#1C205E",
          }}
        />
      ),
    },
    {
      id: 3,
      name: "Internet",
      icon: (
        <NetworkCheckIcon
          sx={{
            fontSize: "10em",
            color: "green",
          }}
        />
      ),
    },
    {
      id: 4,
      name: "Gas",
      icon: (
        <PropaneIcon
          sx={{
            fontSize: "10em",
            color: "red",
          }}
        />
      ),
    },
    {
      id: 5,
      name: "Mobile",
      icon: (
        <MobileFriendlyIcon
          sx={{
            fontSize: "10em",
            color: "purple",
          }}
        />
      ),
    },
  ];

  const handleTileClick = (billType) => {
    navigate(`/receptionist/bill-details/${billType}`);
  };

  return (
    <div>
      <h1>Bill Payments Content Here</h1>
      <Box
        display="flex"
        marginTop="60px"
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
              sx={{
                padding: "20px",
                margin: "10px",
                textAlign: "center",
                width: "250px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {billType.icon}
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                {billType.name}
              </Typography>
            </Paper>
          </ButtonBase>
        ))}
      </Box>
    </div>
  );
};

export default BillPayments;
