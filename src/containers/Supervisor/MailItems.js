import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
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
  const [regionFilter, setRegionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [attemptsFilter, setAttemptsFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const clearFilters = () => {
    setRegionFilter("");
    setStatusFilter("");
    setAttemptsFilter("");
    setTypeFilter("");
  };

  useEffect(() => {
    async function fetchData() {
      const postofficeRegions = await fetchPostOfficeRegions();

      const filters = [
        where("type", "in", ["normal post", "registered post", "logi post"]),
        where("status", "==", "assigned"),
      ];

      //   if (regionFilter) filters.push(where("RegionID", "==", regionFilter));
      if (typeFilter) filters.push(where("type", "==", typeFilter));
      if (statusFilter) filters.push(where("status", "==", statusFilter));

      const unsubscribe = onSnapshot(
        query(collection(db, "MailServiceItem"), ...filters),
        async (snapshot) => {
          const fetchedItems = await Promise.all(
            snapshot.docs.map(async (mailDoc) => {
              const mailData = mailDoc.data();

              if (
                attemptsFilter &&
                mailData.delivery_attempts.length !== parseInt(attemptsFilter)
              ) {
                return null; // Skip this mail item
              }

              // Fetch address details
              const addressDocRef = doc(
                db,
                "Address",
                mailData.receiver_address_id
              );
              const addressDocSnapshot = await getDoc(addressDocRef);
              const addressData = addressDocSnapshot.data();

              if (regionFilter && addressData.RegionID !== regionFilter) {
                return null; // Skip this mail item
              }

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
  }, [regionFilter, typeFilter, statusFilter, attemptsFilter]);

  return (
    <Box>
      <h2>Mail Items</h2>
      <Box display="flex" justifyContent="flex-end" marginBottom="1rem">
        <FormControl
          variant="outlined"
          size="small"
          style={{
            marginRight: "1rem",
            backgroundColor: theme.palette.background.applicationForm,
            width: "150px",
          }}
        >
          <InputLabel>Region</InputLabel>
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            label="Region"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="rg-10">rg-10</MenuItem>
            <MenuItem value="rg-11">rg-11</MenuItem>
            <MenuItem value="rg-12">rg-12</MenuItem>
            <MenuItem value="rg-13">rg-13</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          size="small"
          style={{
            marginRight: "1rem",
            backgroundColor: theme.palette.background.applicationForm,
            width: "150px",
          }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="assigned">assigned</MenuItem>
            <MenuItem value="To be Returned">To be Returned</MenuItem>
            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
            <MenuItem value="Delivery Cancelled">Delivery Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          size="small"
          style={{
            marginRight: "1rem",
            backgroundColor: theme.palette.background.applicationForm,
            width: "150px",
          }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            label="Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="normal post">normal post</MenuItem>
            <MenuItem value="registered post">registered post</MenuItem>
            <MenuItem value="logi post">logi post</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          size="small"
          style={{
            marginRight: "1rem",
            backgroundColor: theme.palette.background.applicationForm,
            width: "150px",
          }}
        >
          <InputLabel>Attempts</InputLabel>
          <Select
            value={attemptsFilter}
            onChange={(e) => setAttemptsFilter(e.target.value)}
            label="Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={clearFilters}
          style={{
            marginRight: "1rem",
            backgroundColor: theme.palette.background.tableHead,
            color: "white",
          }}
        >
          Clear Filters
        </Button>
      </Box>
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
            sx={{ backgroundColor: theme.palette.background.tableHead }}
          >
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              PID
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              HouseNo
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Address_line_1
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Address_line_2
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              City
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Region
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Type
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Assigned Postman
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Delivery Attempts
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mailItems.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                backgroundColor: theme.palette.background.applicationForm,
              }}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.HouseNo}</TableCell>
              <TableCell>{item.Address_line_1}</TableCell>
              <TableCell>{item.Address_line_2}</TableCell>
              <TableCell>{item.City}</TableCell>
              <TableCell>{item.RegionID}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Box
                  style={{
                    display: "inline-block",
                    backgroundColor: "green",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    color: "white",
                  }}
                >
                  {item.status}
                </Box>
              </TableCell>
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
