import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../config/firebase";

import {
  Box,
  Button,
  LinearProgress, // Import LinearProgress for the progress bar
} from "@mui/material";

import { fetchSupervisorPostOfficeId } from "../../data/databaseFunctions";

const AddRoute = () => {
  const [loading, setLoading] = useState(false);
  const [po, setpo] = useState("");

  useEffect(() => {
    let getpoID = async () => {
      let poID = await fetchSupervisorPostOfficeId();

      setpo(poID);
    };
    getpoID();
  }, []);

  const handleClick = async () => {
    console.log("clicked");
    setLoading(true);

    let token = await auth.currentUser.getIdToken();

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    await fetch(
      `${process.env.REACT_APP_SERVER_LINK}/route?po=${po}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        alert(data.desc);
      })
      .catch((err) => {
        console.log(err);
        alert("Error in adding routes");
      });

    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      marginTop="50px"
      height="100vh"
    >
      <Box sx={{ objectFit: "cover" }}>
        <img
          alt="logo"
          height="500px"
          src={`../../assets/route.png`}
          style={{ cursor: "pointer" }}
        />
      </Box>

      <div style={{ width: "40%", marginTop: 40 }}>
        {loading && (
          <LinearProgress
            variant="query"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #4CAF50 25%, transparent 25%, transparent 75%, #4CAF50 75%)",
              backgroundSize: "100px 100%",
            }}
          />
        )}
      </div>

      <Button
        variant="contained"
        sx={{
          marginTop: "60px",
          backgroundColor: "#852318",
          color: "white",
          px: 8,
          textTransform: "none",
          fontSize: "18px",
          borderRadius: "6px",
        }}
        onClick={handleClick}
      >
        Add Routes
      </Button>
    </Box>
  );
};

export default AddRoute;
