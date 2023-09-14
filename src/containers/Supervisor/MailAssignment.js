import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { mailAssignmentData } from "./../../data/mailAssignmentData";

const MailAssignment = () => {
  const rows = mailAssignmentData(); // Read the dummy data
  const headerCellStyle = {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.1rem",
  };

  const [selectedPostmen, setSelectedPostmen] = useState(
    Array(rows.length).fill("")
  ); // Initialize selectedPostmen state

  const handlePostmanChange = (event, index) => {
    const updatedPostmen = [...selectedPostmen];
    updatedPostmen[index] = event.target.value;
    setSelectedPostmen(updatedPostmen);
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
            <TableCell sx={headerCellStyle}>PID</TableCell>
            <TableCell sx={headerCellStyle}>Address No</TableCell>
            <TableCell sx={headerCellStyle}>Street 1</TableCell>
            <TableCell sx={headerCellStyle}>Street 2</TableCell>
            <TableCell sx={headerCellStyle}>City</TableCell>
            <TableCell sx={headerCellStyle}>Postman</TableCell>{" "}
            {/* Updated header */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ backgroundColor: "white" }}>
              <TableCell>{row.pid}</TableCell>
              <TableCell>{row.addressNo}</TableCell>
              <TableCell>{row.street1}</TableCell>
              <TableCell>{row.street2}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>
                <Select
                  value={selectedPostmen[index]}
                  onChange={(event) => handlePostmanChange(event, index)}
                  sx={{ width: "200px", fontSize: "0.75em" }}
                >
                  <MenuItem value="">Select Postman</MenuItem>
                  <MenuItem value="Postman 1">Mr. Kamal Dharmadasa</MenuItem>
                  <MenuItem value="Postman 2">Mr. Sudharshana</MenuItem>
                  <MenuItem value="Postman 3">Mr. Saman Lenin</MenuItem>
                  <MenuItem value="Postman 4">Mr. Navendra Hemasiri</MenuItem>
                  <MenuItem value="Postman 5">Mr. Sumathipala</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center">
        {/* Center-align the button */}
        <Button
          variant="contained"
          sx={{
            marginTop: "60px",
            backgroundColor: "#852318",
            color: "white",
            px: 8,
            textTransform: "none",
            fontSize: "18px",
            borderRadius: "6px",
          }}
        >
          Confirm Mail Assignments
        </Button>
      </Box>
    </div>
  );
};

export default MailAssignment;
