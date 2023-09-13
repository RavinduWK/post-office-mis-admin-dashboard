import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { moneyOrderData } from "../../data/moneyOrderData";

const PayMoneyOrder = () => {
  const rows = moneyOrderData(); // Read the dummy data
  const headerCellStyle = {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.1rem",
  };

  return (
    <div>
      <h1>Pay Money Orders</h1>

      <Table
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontSize: "1.2em",
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#852318" }}>
            {" "}
            {/* Changed color to dark green */}
            <TableCell sx={headerCellStyle}>PID</TableCell>
            <TableCell sx={headerCellStyle}>Recipient ID</TableCell>
            <TableCell sx={headerCellStyle}>Recipient Name</TableCell>
            <TableCell sx={headerCellStyle}>Security Code</TableCell>
            <TableCell sx={headerCellStyle}>Amount of Money</TableCell>
            <TableCell sx={headerCellStyle}>Confirm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ backgroundColor: "white" }}>
              <TableCell>{row.pid}</TableCell>
              <TableCell>{row.recipientId}</TableCell>
              <TableCell>{row.recipientName}</TableCell>
              <TableCell>{row.securityCode}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100px", fontSize: "0.75em" }}
                >
                  Pay
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayMoneyOrder;
