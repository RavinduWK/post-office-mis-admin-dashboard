import React, { useState, useEffect, useRef } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
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
import LoadingScreen from "../Common/LoadingScreen";

const fetchMailItems = async () => {
  const mailServiceItemRef = collection(db, "MailServiceItem");
  const q = query(
    mailServiceItemRef,
    where("type", "in", ["normal post", "registered post", "logi post"]),
    where("status", "==", "To be dispatched")
  );
  const querySnapshot = await getDocs(q);

  const mailItems = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id, // This includes the document ID in the object
  }));

  console.log("Fetched mail items:", mailItems);

  return mailItems;
};

const fetchAddressDetailsByAddressId = async (id) => {
  const addressRef = collection(db, "Address");
  const docSnapshot = await getDoc(doc(addressRef, id));

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  }

  return null;
};

const ExpandableRow = ({ to, mailItems, date }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const barcodeRef = useRef(null);

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
        <Typography>Number of Items: {mailItems.length}</Typography>
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
                {mailItems.map((item, index) => (
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
  const [mailData, setMailData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mailItems = await fetchMailItems();

      const districtClassifiedData = {};

      for (const item of mailItems) {
        const addressDetails = await fetchAddressDetailsByAddressId(
          item.receiver_address_id
        );
        if (addressDetails && addressDetails.District) {
          const district = addressDetails.District;
          if (!districtClassifiedData[district]) {
            districtClassifiedData[district] = [];
          }
          item.PID = item.id; // Assuming item has an id field that represents the document id
          item.postType = item.type;
          item.destination = addressDetails.City;
          item.destinationAddress = `${addressDetails.HouseNo}, ${addressDetails.Address_line_1}, ${addressDetails.Address_line_2}, ${addressDetails.City}`;

          districtClassifiedData[district].push(item);
        }
      }

      console.log("Classified data by district:", districtClassifiedData);
      setMailData(districtClassifiedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log("Current state of mailData:", mailData);

  return (
    <Box>
      {loading && <LoadingScreen />}
      <h2>Mail Transfer List</h2>
      <Box sx={{ marginTop: "20px", mx: "15px" }}>
        {Object.entries(mailData).map(([district, items], index) => (
          <ExpandableRow
            key={index}
            to={district}
            mailItems={items} // Changed from numberOfItems to mailItems
            date={new Date().toISOString().slice(0, 10)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MailTransfer;
