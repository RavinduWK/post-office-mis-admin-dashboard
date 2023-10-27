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

const AddRoute = () => {
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
        <LinearProgress
          variant="indeterminate"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #4CAF50 25%, transparent 25%, transparent 75%, #4CAF50 75%)",
            backgroundSize: "100px 100%",
          }}
        />
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
      >
        Add Routes
      </Button>
    </Box>
  );
};

export default AddRoute;
