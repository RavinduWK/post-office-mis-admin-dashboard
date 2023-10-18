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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Barcode from "react-barcode";
import { toJpeg } from "html-to-image";
import LoadingScreen from "../Common/LoadingScreen";


const AddRoute = () => {

  return (
    <Box>
      <Button variant="contained" color="primary">
        Add Route
        </Button>
    </Box>
  );
};

export default AddRoute;
