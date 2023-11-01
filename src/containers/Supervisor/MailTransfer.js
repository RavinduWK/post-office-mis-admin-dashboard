import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
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
import LoadingScreen from "../Common/LoadingScreen";
import {
  fetchMainPostOfficeIdByDistrict,
  fetchSupervisorPostOfficeId,
  updateMailItemStatus,
} from "../../data/databaseFunctions";

const fetchMailItems = async () => {
  const mailServiceItemRef = collection(db, "MailServiceItem");
  const q = query(
    mailServiceItemRef,
    where("type", "in", ["normal post", "registered post", "logi post"]),
    where("status", "==", "To be Bundled")
  );
  const querySnapshot = await getDocs(q);

  const mailItems = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id, // This includes the document ID in the object
  }));

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
        </Box>
      )}
    </Box>
  );
};

const MailTransfer = () => {
  const [mailItems, setMailItems] = useState([]);
  const [mailData, setMailData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supervisorPostOfficeId, setSupervisorPostOfficeId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mailItems = await fetchMailItems();

      const id = await fetchSupervisorPostOfficeId();
      setSupervisorPostOfficeId(id);

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
          item.PID = item.id;
          item.postType = item.type;
          item.destination = addressDetails.City;
          item.destinationAddress = `${addressDetails.HouseNo}, ${addressDetails.Address_line_1}, ${addressDetails.Address_line_2}, ${addressDetails.City}`;

          districtClassifiedData[district].push(item);
        }
      }

      setMailData(districtClassifiedData);
      setMailItems(mailItems);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCreateBundle = async () => {
    const firstDistrict = Object.keys(mailData)[0];

    const destinationPostOfficeId = await fetchMainPostOfficeIdByDistrict(
      firstDistrict
    );
    if (!destinationPostOfficeId) {
      console.error(
        "Couldn't find the post office ID for the district:",
        firstDistrict
      );
      return; // If the post office ID is not found, exit the function early.
    }
    const bundleData = {
      date: day + month + year,
      destination_post_office_id: destinationPostOfficeId,
      mail_service_items: Object.values(mailData).flatMap((districtMailData) =>
        districtMailData.map((item) => item.PID)
      ),
      origin_post_office_id: supervisorPostOfficeId,
      status: "Queued",
    };

    // Add new document to the "Bundle" collection
    const newBundleDocRef = await addDoc(collection(db, "Bundle"), bundleData);

    for (const mailItemId of bundleData.mail_service_items) {
      await updateMailItemStatus(mailItemId, "Queued");
    }

    // Navigate to the new page
    navigate(`${location.pathname}/bundles`);
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed
  const year = currentDate.getFullYear().toString();

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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={5}
      >
        {mailItems.length === 0 && (
          <Typography variant="h3" sx={{ marginBottom: "40px" }}>
            Nothing to be dispatched ...
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleCreateBundle}
          disabled={mailItems.length === 0}
          sx={{
            backgroundColor: "#852318",
            color: "white",
            px: 10,
            textTransform: "none",
            fontSize: "18px",
            borderRadius: "6px",
          }}
        >
          Create Bundles
        </Button>
      </Box>
    </Box>
  );
};

export default MailTransfer;
