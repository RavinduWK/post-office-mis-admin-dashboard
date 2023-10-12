import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  useTheme,
  MenuItem,
} from "@mui/material";
import {
  fetchMailItems,
  fetchPostOfficeRegions,
  fetchPostmenForPostOffice,
  fetchSupervisorPostOfficeId,
} from "../../data/databaseFunctions";

const MailAssignment = () => {
  const theme = useTheme();
  const [selectedPostmen, setSelectedPostmen] = useState({});
  const [mailItems, setMailItems] = useState([]);
  const [postmanNameMapping, setPostmanNameMapping] = useState({});
  const [postmen, setPostmen] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postOfficeRegions = await fetchPostOfficeRegions();
      const postOfficeId = await fetchSupervisorPostOfficeId();
      const postmenList = await fetchPostmenForPostOffice(postOfficeId);
      const postmanMapping = {};
      postmenList.forEach((postman) => {
        postmanMapping[postman.id] = postman.name;
      });
      setPostmanNameMapping(postmanMapping);
      setPostmen(postmenList);
      const items = await fetchMailItems(postOfficeRegions);
      setMailItems(items);
    }
    fetchData();
  }, []);

  const handlePostmanChange = (event, itemId) => {
    setSelectedPostmen((prev) => ({
      ...prev,
      [itemId]: event.target.value,
    }));
  };

  return (
    <Box>
      <h2>Mail Assignments</h2>
      <div>
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
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                PID
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                Address No
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                Street 1
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                Street 2
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                City
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                Postman
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
                <TableCell>{item.receiver_address_id}</TableCell>
                <TableCell>{item.street1}</TableCell>
                <TableCell>{item.street2}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>
                  <Select
                    value={
                      postmanNameMapping[item.assigned_postman] || "Unknown"
                    }
                    onChange={(event) => handlePostmanChange(event, item.id)}
                    sx={{ width: "200px", fontSize: "0.75em" }}
                  >
                    <MenuItem value="">Select Postman</MenuItem>
                    {postmen.map((postman) => (
                      <MenuItem key={postman.id} value={postman.name}>
                        {postmanNameMapping[postman.id] || "Unknown"}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center">
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
    </Box>
  );
};

export default MailAssignment;
