// Receptionist.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./scenes/dashboard/index";
import NormalPost from "./scenes/normalpost/index";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar_Receptionist";
import RegisteredPost from "./scenes/registeredpost/index";
import MoneyOrder from "./scenes/moneyorder/index";
import PayMoneyOrder from "./scenes/paymoneyorder/index";
import LogiPost from "./scenes/logipost/index";
import FastTrackCourier from "./scenes/fasttrackcourier/index";
import BillPayments from "./scenes/billpayments/index";
import BillDetails from "./scenes/billpayments/BillDetails";

function ReceptionistInterface() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="app">
          <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <main
            className="content"
            style={{ overflowY: "auto", height: "100vh" }}
          >
            <Routes>
              <Route path="" element={<DashBoard />} />
              <Route path="normal-post" element={<NormalPost />} />
              <Route path="registered-post" element={<RegisteredPost />} />
              <Route path="money-order" element={<MoneyOrder />} />
              <Route path="pay-money-order" element={<PayMoneyOrder />} />
              <Route path="logi-post" element={<LogiPost />} />
              <Route path="fast-track-courier" element={<FastTrackCourier />} />
              <Route path="bill-payments" element={<BillPayments />} />
              <Route path="bill-details/:billType" element={<BillDetails />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ReceptionistInterface;
