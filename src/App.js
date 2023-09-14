import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./containers/Common/login";
import ReceptionistInterface from "./Navigation/ReceptionistNavigation";
import PostmasterInterface from "./Navigation/PostMasterNavigation";
import SupervisorInterface from "./Navigation/SupervisorNavigation";
import "./index.css";
import ProtectedRoute from "./Navigation/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/receptionist/*"
        element={
          <ProtectedRoute
            element={<ReceptionistInterface />}
            roles={["Receptionist"]}
          />
        }
      />
      <Route
        path="/postmaster/*"
        element={
          <ProtectedRoute
            element={<PostmasterInterface />}
            roles={["Postmaster"]}
          />
        }
      />
      <Route
        path="/supervisor/*"
        element={
          <ProtectedRoute
            element={<SupervisorInterface />}
            roles={["Supervisor"]}
          />
        }
      />
    </Routes>
  );
}

export default App;
