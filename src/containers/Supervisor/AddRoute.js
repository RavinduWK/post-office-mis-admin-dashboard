import React, { useState, useEffect, useRef } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Box,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Button,
  LinearProgress, // Import LinearProgress for the progress bar
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Barcode from "react-barcode";
import { toJpeg } from "html-to-image";
import LoadingScreen from "../Common/LoadingScreen";
import { fetchSupervisorPostOfficeId } from "../../data/databaseFunctions";

const AddRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

    await fetch(`${process.env.REACT_APP_SERVER_LINK}/route?po=${po}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status) {
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });

    if (error) {
      alert("Error in adding routes");
    } else {
      alert("Routes added successfully");
    }
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
