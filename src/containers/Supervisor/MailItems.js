import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { fetchPostOfficeRegions } from "../../data/databaseFunctions";

const MailItemsTable = () => {
  const theme = useTheme();
  const [mailItems, setMailItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postofficeRegions = await fetchPostOfficeRegions();

      const unsubscribe = onSnapshot(
        query(
          collection(db, "MailServiceItem"),
          where("type", "in", ["normal post", "registered post", "logi post"]),
          where("status", "==", "assigned")
        ),
        async (snapshot) => {
          const fetchedItems = await Promise.all(
            snapshot.docs.map(async (mailDoc) => {
              const mailData = mailDoc.data();

              // Fetch address details
              const addressDocRef = doc(
                db,
                "Address",
                mailData.receiver_address_id
              );
              const addressDocSnapshot = await getDoc(addressDocRef);
              const addressData = addressDocSnapshot.data();

              // Check if the address belongs to the regions of the supervisor's post office
              if (!postofficeRegions.includes(addressData.RegionID)) {
                return null; // Skip this mail item
              }

              // Fetch postman name if assigned_postman is an ID
              let postmanName = mailData.assigned_postman;
              if (postmanName !== "Not Assigned" && postmanName !== "Pending") {
                const postmanDocRef = doc(db, "employees", postmanName);
                const postmanDocSnapshot = await getDoc(postmanDocRef);
                if (postmanDocSnapshot.exists()) {
                  postmanName = postmanDocSnapshot.data().name;
                }
              }

              return {
                id: mailDoc.id,
                postmanName,
                ...mailData,
                ...addressData,
              };
            })
          );

          // Filter out null values (mail items that didn't meet the criteria)
          setMailItems(fetchedItems.filter((item) => item !== null));
        }
      );

      // Cleanup the listener when the component is unmounted
      return () => unsubscribe();
    }

    fetchData();
  }, []);
  return (
    <Box>
      <h2>Mail Items</h2>
      <Table
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontSize: "1.2em",
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell>PID</TableCell>
            <TableCell>HouseNo</TableCell>
            <TableCell>Address_line_1</TableCell>
            <TableCell>Address_line_2</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assigned Postman</TableCell>
            <TableCell>Delivery Attempts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mailItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.HouseNo}</TableCell>
              <TableCell>{item.Address_line_1}</TableCell>
              <TableCell>{item.Address_line_2}</TableCell>
              <TableCell>{item.City}</TableCell>
              <TableCell>{item.RegionID}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.postmanName}</TableCell>
              <TableCell>{item.delivery_attempts?.length || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MailItemsTable;
