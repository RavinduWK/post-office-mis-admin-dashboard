import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Barcode from "react-barcode";
import { toJpeg } from "html-to-image";

const ExpandableRow = ({ to, numberOfItems, date }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const barcodeRef = useRef(null);

  const items = Array.from({ length: numberOfItems }, (_, index) => ({
    PID: `PID${index + 1}`,
    postType: "Regular",
    destination: to,
    destinationAddress: "123 Main St",
  }));

  const printBarcode = () => {
    const node = document.createElement("div");
    node.style.display = "flex";
    node.style.justifyContent = "center";
    node.style.alignItems = "center";

    node.style.backgroundColor = "white";
    node.appendChild(barcodeRef.current.cloneNode(true));

    toJpeg(node, { quality: 0.95, width: 280, height: 160 }).then(function (
      dataUrl
    ) {
      var link = document.createElement("a");
      link.download = "barcode.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        border="1px solid #000"
        padding="16px"
        marginTop="20px"
        marginBottom="8px"
        backgroundColor={theme.palette.background.feedbacks}
      >
        <Typography>To: {to}</Typography>
        <Typography>Number of Items: {numberOfItems}</Typography>
        <Typography>Date: {date}</Typography>
        <IconButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {isOpen && (
        <Box
          border="1px solid #000"
          padding="16px"
          marginBottom="8px"
          bgcolor="#d1d1d1"
        >
          <TableContainer>
            <Table
              size="small"
              aria-label="a dense table"
              sx={{ borderCollapse: "separate", borderSpacing: "0 2px" }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: theme.palette.background.feedbacks,
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1em" }}>
                    PID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1em" }}>
                    Post Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1em" }}>
                    Destination
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1em" }}>
                    Destination Address
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: theme.palette.background.feedbacksRead,
                    }}
                  >
                    <TableCell>{item.PID}</TableCell>
                    <TableCell>{item.postType}</TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.destinationAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} ref={barcodeRef}>
            <Barcode value={to} />
          </Box>
          <Button variant="contained" onClick={printBarcode}>
            Print Barcode
          </Button>
        </Box>
      )}
    </Box>
  );
};

const MailTransfer = () => {
  return (
    <Box>
      <h2>Mail Transfer List</h2>
      <Box sx={{ marginTop: "20px", mx: "15px" }}>
        <ExpandableRow to="Colombo" numberOfItems={2} date="2023/09/11" />
        <ExpandableRow to="Galle" numberOfItems={3} date="2023/09/12" />
        <ExpandableRow to="Kandy" numberOfItems={4} date="2023/09/13" />
      </Box>
    </Box>
  );
};

export default MailTransfer;
