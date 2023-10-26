import React from "react";
import { Box, Divider, Typography } from "@mui/material";

function ReceiptTemplate({ mailId, securityNumber, cost, type }) {
  return (
    <Box
      sx={{
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="12px"
        >
          <Box sx={{ objectFit: "cover" }}>
            <img
              alt="logo"
              height="60px"
              src={`../../assets/app-logo.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>

          <Box sx={{ objectFit: "cover" }}>
            <img
              alt="logo"
              height="30px"
              src={`../../assets/app-logo-text.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>
        <Typography variant="h4" component="h2" sx={{ marginTop: "10px" }}>
          Receipt
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography variant="body1">PID: {mailId}</Typography>
        <Typography variant="body1">
          Security Number: {securityNumber}
        </Typography>
        <Typography variant="body1" color="primary">
          Cost: Rs. {cost}.00
        </Typography>
        <Typography variant="body1">Type: {type}</Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography variant="body2">
          Timestamp: {new Date().toLocaleString()}
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          textAlign: "right",
          padding: "20px",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Authorized Signature
        </Typography>
        <Typography variant="body2">Contact Person: John Doe</Typography>
        <Typography variant="body2">Telephone: +1 (123) 456-7890</Typography>
        <Typography variant="body2">
          Post: Customer Support Executive
        </Typography>
      </Box>
    </Box>
  );
}

export default ReceiptTemplate;
