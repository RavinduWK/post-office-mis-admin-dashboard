import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../containers/Common/Dashboard";
import NormalPost from "../containers/Receptionist/NormalPost";
import { ColorModeContext, useMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "../components/LayoutComponents/Topbar";

import RegisteredPost from "../containers/Receptionist/RegisteredPost";
import MoneyOrder from "../containers/Receptionist/MoneyOrder";
import PayMoneyOrder from "../containers/Receptionist/PayMoneyOrder";
import LogiPost from "../containers/Receptionist/LogiPost";
import FastTrackCourier from "../containers/Receptionist/FastTrackCourier";
import BillPayments from "../containers/Receptionist/BillPayments";
import BillDetails from "../containers/Receptionist/BillDetails";
import ConfirmationPage from "../containers/Common/ConfirmationPage";
import SideBar from "../components/LayoutComponents/Sidebar";
import SuccessMessage from "../containers/Common/Success";

function ReceptionistInterface() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          role="receptionist"
        />
        <div className="app">
          <SideBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            role="receptionist"
          />
          <main
            className="content"
            style={{ overflowY: "auto", height: "100vh" }}
          >
            <Routes>
              <Route path="" element={<DashBoard role="Receptionist" />} />
              <Route path="normal-post" element={<NormalPost />} />
              <Route path="registered-post" element={<RegisteredPost />} />
              <Route path="money-order" element={<MoneyOrder />} />
              <Route path="pay-money-order" element={<PayMoneyOrder />} />
              <Route path="logi-post" element={<LogiPost />} />
              <Route path="fast-track-courier" element={<FastTrackCourier />} />
              <Route path="bill-payments" element={<BillPayments />} />
              <Route path="bill-details/:billType" element={<BillDetails />} />
              <Route
                path="bill-details/:billType/completed"
                element={<SuccessMessage />}
              />
              <Route
                path="normal-post/success"
                element={<ConfirmationPage />}
              />
              <Route
                path="registered-post/success"
                element={<ConfirmationPage />}
              />
              <Route path="logi-post/success" element={<ConfirmationPage />} />
              <Route
                path="fast-track-courier/success"
                element={<ConfirmationPage />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ReceptionistInterface;
