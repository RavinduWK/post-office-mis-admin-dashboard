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
import { readDummyData } from "./readDummyData"; // Import the utility function

const PayMoneyOrder = () => {
  const rows = readDummyData(); // Read the dummy data

  return (
    <div>
      <h1>Pay money order content</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PID</TableCell>
              <TableCell>Recipient ID</TableCell>
              <TableCell>Recipient Name</TableCell>
              <TableCell>Security Code</TableCell>
              <TableCell>Amount of Money</TableCell>
              <TableCell>Confirm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pid}</TableCell>
                <TableCell>{row.recipientId}</TableCell>
                <TableCell>{row.recipientName}</TableCell>
                <TableCell>{row.securityCode}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default PayMoneyOrder;
