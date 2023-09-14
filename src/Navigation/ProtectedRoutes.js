import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import getUserRole from "../data/getRole"; // Make sure the path is correct

function ProtectedRoute({ element, roles }) {
  const [authStatus, setAuthStatus] = useState({ isAuth: false, role: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get the user role from your database here
        const role = await getUserRole(user.uid);
        setAuthStatus({ isAuth: true, role });
      } else {
        setAuthStatus({ isAuth: false, role: null });
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  if (authStatus.isAuth && (roles ? roles.includes(authStatus.role) : true)) {
    return element;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
