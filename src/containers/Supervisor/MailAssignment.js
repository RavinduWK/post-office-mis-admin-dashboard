import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
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
  updateAssignedPostmanAndStatus,
} from "../../data/databaseFunctions";
import LoadingScreen from "../Common/LoadingScreen";
import { useNavigate } from "react-router-dom";

const MailAssignment = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedPostmen, setSelectedPostmen] = useState({});
  const [mailItems, setMailItems] = useState([]);
  const [postmanNameMapping, setPostmanNameMapping] = useState({});
  const [postmen, setPostmen] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
      setLoading(false);
    }
    console.log(mailItems);
    fetchData();
  }, []);

  const handlePostmanChange = (event, itemId) => {
    setSelectedPostmen((prev) => ({
      ...prev,
      [itemId]: event.target.value,
    }));
  };

  const handleConfirmAssignments = async () => {
    for (const item of mailItems) {
      const itemId = item.id;
      const postmanId = selectedPostmen[itemId] || item.assigned_postman;
      if (postmanId) {
        await updateAssignedPostmanAndStatus(itemId, postmanId);
      }
    }
    alert("Mail assignments and statuses updated successfully!");
    navigate("mail-assignment");
  };

  return (
    <Box>
      {loading && <LoadingScreen text="Loading..." />}
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
                Line 1
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
              >
                Line 2
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
                <TableCell>{item.HouseNo}</TableCell> {/* Address No */}
                <TableCell>{item.Address_line_1}</TableCell> {/* Street 1 */}
                <TableCell>{item.Address_line_2}</TableCell> {/* Street 2 */}
                <TableCell>{item.City}</TableCell> {/* City */}
                <TableCell>
                  <Select
                    value={
                      selectedPostmen[item.id] || item.assigned_postman || ""
                    }
                    onChange={(event) => handlePostmanChange(event, item.id)}
                    sx={{ width: "200px", fontSize: "0.75em" }}
                  >
                    <MenuItem value="">Select Postman</MenuItem>
                    {postmen.map((postman) => (
                      <MenuItem key={postman.id} value={postman.id}>
                        {postmanNameMapping[postman.id] || "Unknown"}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          {mailItems.length === 0 && (
            <Typography variant="h3" sx={{ marginBottom: "40px" }}>
              Nothing to be assigned ...
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleConfirmAssignments}
            disabled={mailItems.length === 0} // <-- Add this line
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
