import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./containers/Common/login";
import ReceptionistInterface from "./Navigation/ReceptionistNavigation";
import PostmasterInterface from "./Navigation/PostMasterNavigation";
import SupervisorInterface from "./Navigation/SupervisorNavigation";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/receptionist/*" element={<ReceptionistInterface />} />
      <Route path="/postmaster/*" element={<PostmasterInterface />} />
      <Route path="/supervisor/*" element={<SupervisorInterface />} />
    </Routes>
  );
}

export default App;
