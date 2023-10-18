import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../containers/Common/Dashboard";

import { ColorModeContext, useMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "../components/LayoutComponents/Topbar";
import SideBar from "../components/LayoutComponents/Sidebar";
import RegisterEmployee from "../containers/Supervisor/RegisterEmployee";
import MailAssignment from "../containers/Supervisor/MailAssignment";
import MailTransfer from "../containers/Supervisor/MailTransfer";
import DashboardSupervisor from "../containers/Common/DashboardSupervisor";
import MailItemsTable from "../containers/Supervisor/MailItems";
import Bundles from "../containers/Supervisor/Bundles";

function SupervisorInterface() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          role="supervisor"
        />
        <div className="app">
          <SideBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            role="supervisor"
          />
          <main
            className="content"
            style={{ overflowY: "auto", height: "100vh" }}
          >
            <Routes>
              {/* <Route path="" element={<DashBoard role="Supervisor" />} /> */}
              <Route path="" element={<DashboardSupervisor />} />
              <Route path="register-employee" element={<RegisterEmployee />} />
              <Route path="mail-assignment" element={<MailAssignment />} />
              <Route path="mail-items" element={<MailItemsTable />} />
              <Route path="mail-transfer" element={<MailTransfer />} />
              <Route path="mail-transfer/bundles" element={<Bundles />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default SupervisorInterface;
