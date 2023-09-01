import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import ReceptionistInterface from "./Receptionist";
import PostmasterInterface from "./PostMaster";
import "./index.css"; // Import your CSS file

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/receptionist/*" element={<ReceptionistInterface />} />
      <Route path="/postmaster/*" element={<PostmasterInterface />} />
      <Route path="/supervisor/*" element={<ReceptionistInterface />} />
    </Routes>
  );
}

export default App;
