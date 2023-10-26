import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Button,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Barcode from "react-barcode";
import { toJpeg } from "html-to-image";
import LoadingScreen from "../Common/LoadingScreen";

const Bundles = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [bundles, setBundles] = useState([]);
  const barcodeRef = useRef(null);

  const handlePrintBarcode = () => {
    const node = document.createElement("div");
    node.style.display = "flex";
    node.style.justifyContent = "center";
    node.style.alignItems = "center";

    node.style.backgroundColor = "white";
    node.appendChild(barcodeRef.current.cloneNode(true));

    toJpeg(node, { quality: 0.95, width: 280, height: 160 }).then(function (
      dataUrl
    ) {
      var link = document.createElement("a");
      link.download = "barcode.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  useEffect(() => {
    const fetchBundles = async () => {
      setLoading(true);
      const bundlesSnapshot = await getDocs(collection(db, "Bundle"));
      const bundlesData = bundlesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBundles(bundlesData);
      setLoading(false);
    };

    fetchBundles();
  }, []);

  return (
    <Box>
      {loading && <LoadingScreen text="Loading..." />}
      <h2>Mail Items</h2>

      <Table
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontSize: "1.2em",
        }}
      >
        <TableHead>
          <TableRow
            sx={{ backgroundColor: theme.palette.background.tableHead }}
          >
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Bundle_ID
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Destination Postoffice
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              No. of Items
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white", fontSize: "1.1rem" }}
            >
              Barcode
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bundles.map((bundle) => (
            <TableRow
              key={bundle.id}
              sx={{
                backgroundColor: theme.palette.background.applicationForm,
              }}
            >
              <TableCell>{bundle.id}</TableCell>
              <TableCell>{bundle.destination_post_office_id}</TableCell>
              <TableCell>{bundle.mail_service_items.length}</TableCell>
              <TableCell>
                <Box mt={2} display="flex" alignItems="center">
                  <Box mt={2} ref={barcodeRef}>
                    <Barcode value={bundle.id} width={1.2} height={60} />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handlePrintBarcode(bundle.id)}
                    sx={{
                      ml: 2,
                      color: theme.palette.text.typography, // Text color
                      borderColor: theme.palette.text.typography, // Border color
                    }}
                  >
                    Print
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Bundles;
