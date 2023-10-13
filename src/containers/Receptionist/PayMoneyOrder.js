import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Button,
} from "@mui/material";
import { moneyOrderData } from "../../data/moneyOrderData";
import {
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const PayMoneyOrder = () => {
  const [rows, setRows] = useState([]);

  const headerCellStyle = {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.1rem",
  };

  useEffect(() => {
    const q = query(
      collection(db, "MailServiceItems"),
      where("paid", "==", false)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rowData = [];
      querySnapshot.forEach((doc) => {
        rowData.push({ pid: doc.id, ...doc.data() });
      });
      setRows(rowData);
    });

    return () => unsubscribe();
  }, []);

  const handlePay = async (pid) => {
    try {
      const docRef = doc(db, "MailServiceItems", pid);
      await updateDoc(docRef, { paid: true });
      console.log("Payment successful for PID:", pid);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  const theme = useTheme();

  return (
    <div>
      <h1 sx={{ color: theme.palette.text.typography }}>Pay Money Orders</h1>

      <Table
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontSize: "1.2em",
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#852318",
            }}
          >
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
            <TableRow
              key={index}
              sx={{ backgroundColor: theme.palette.background.dialogBox }}
            >
              <TableCell>{row.pid}</TableCell>
              <TableCell>{row.recipient_nic}</TableCell>
              <TableCell>{row.recipient_name}</TableCell>
              <TableCell>{row.security_number}</TableCell>
              <TableCell>{row.transfer_amount}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100px", fontSize: "0.75em" }}
                  onClick={() => handlePay(row.pid)}
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
