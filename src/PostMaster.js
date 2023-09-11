// Receptionist.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./scenes/dashboard/index";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar_Postmaster";
import Statistics from "./scenes/postalstatistics/index";
import GoogleMap from "./scenes/monitorpostman";
import RegisterEmployee from "./scenes/registeremployee/index";

function PostmasterInterface() {
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
              <Route path="normal-post" element={<RegisterEmployee />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="live-delivery-map" element={<GoogleMap />} />
              <Route path="register-employee" element={<RegisterEmployee />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PostmasterInterface;
