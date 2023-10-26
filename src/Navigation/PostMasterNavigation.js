import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "../components/LayoutComponents/Topbar";
import SideBar from "../components/LayoutComponents/Sidebar";
import Statistics from "../containers/Postmaster/PostOfficeStatistics";
import MonitorPostman from "../containers/Postmaster/MonitorPostman";
import RegisterEmployee from "../containers/Postmaster/RegisterEmployee";
import ViewFeedback from "../containers/Postmaster/ViewFeedback";
import DashboardPostmaster from "../containers/Common/DashboardPostmaster";

function PostmasterInterface() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          role="postmaster"
        />
        <div className="app">
          <SideBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            role="postmaster"
          />
          <main
            className="content"
            style={{ overflowY: "auto", height: "100vh" }}
          >
            <Routes>
              <Route path="" element={<DashboardPostmaster />} />
              <Route path="normal-post" element={<RegisterEmployee />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="live-delivery-map" element={<MonitorPostman />} />
              <Route path="register-employee" element={<RegisterEmployee />} />
              <Route path="feedback" element={<ViewFeedback />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PostmasterInterface;
