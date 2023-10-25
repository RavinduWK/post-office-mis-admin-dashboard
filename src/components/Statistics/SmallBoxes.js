import React from "react";
import { Box } from "@mui/material";
import StatBox from "./StatBox";
import { getCustomerCount, getEmployeeCount, getMailCount, getRegions, getRegisteredAddresses, getTotalRevenue } from "../../data/databaseFunctions";
import { useState } from "react";

const SmallBoxes = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalRegisteredAddresses, setTotalRegisteredAddresses] = useState(0);
  const [totalAreasCovered, setTotalAreasCovered] = useState(0);
  const [totalMails, setTotalMails] = useState(0);
  
  const setEmployeeCount = async (event) => {
    setTotalEmployees(await getEmployeeCount());
  };
  const setMailCount = async (event) => {
    setTotalMails(await getMailCount());
  };
  const setRegisteredAddresses = async (event) => {
    setTotalRegisteredAddresses(await getRegisteredAddresses());
  };
  const setAreaCount = async (event) => {
    setTotalAreasCovered(await getRegions());
  };
  const setRevenue = async (event) => {
    setTotalRevenue(await getTotalRevenue());
  };
  const setCustomers = async (event) => {
    setTotalCustomers(await getCustomerCount());
  };

  setEmployeeCount();
  setMailCount();
  setRegisteredAddresses();
  setAreaCount();
  setRevenue();
  setCustomers();

  return (
    <Box sx={{ marginTop: "20px" }} >
      <center>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <StatBox title="Employees" value={totalEmployees} />
        <StatBox title="Customers" value={totalCustomers} />
        <StatBox title="Covered Areas" value={totalAreasCovered} />
        <StatBox title="Registered Addresses" value={totalRegisteredAddresses} />
      </Box>
      <Box>
        <div>
          <table>
            <tr align="center">
              <td>
                <StatBox
                  title="Total Mail Items"
                  value={totalMails}
                  style={{ border: "1px solid black", backgroundColor: "#50C700" }}
                />
              </td>
              <td>
                <StatBox
                  title="Revenue"
                  value={totalRevenue}
                  style={{ border: "1px solid black", backgroundColor: "#f2c848" }}
                />
              </td>
            </tr>
          </table>
        </div>
      </Box>
      </center>
    </Box>
  );
};

export default SmallBoxes;
