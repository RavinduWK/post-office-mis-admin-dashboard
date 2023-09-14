import React, { useRef } from "react";
import { Box, Divider, Button, TextField, GlobalStyles } from "@mui/material";
import Barcode from "react-barcode";
import { toJpeg } from "html-to-image";

function ConfirmationPage() {
  const postageCost = 50;
  const receiptRef = useRef(null);
  const barcodeRef = useRef(null);

  const printReceipt = () => {
    const node = document.createElement("div");
    node.style.display = "flex";
    node.style.justifyContent = "center";
    node.style.alignItems = "center";

    node.style.backgroundColor = "white";
    node.appendChild(receiptRef.current.cloneNode(true));

    toJpeg(node, { quality: 0.95, width: 500, height: 700 }).then(function (
      dataUrl
    ) {
      var link = document.createElement("a");
      link.download = "receipt.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  const printBarCode = () => {
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
      link.download = "receipt.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "background.default",
        py: 2,
      }}
    >
      <Box sx={{ my: "10px" }}>
        <h2>Success</h2>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}
      >
        <Box
          ref={receiptRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "400px",
            height: "400px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "white",
            border: "1px solid #000",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginTop: "50px",
            lineHeight: "40px",
            fontSize: "20px",
          }}
        >
          <div>PID: 1230445</div>
          <div>Security Number: 124512412544</div>
          <Divider
            sx={{
              marginTop: 5,
              marginBottom: 2,
              border: "1px solid grey",
              width: "100%",
            }}
          />

          <Box>
            <Barcode ref={barcodeRef} value="1230445" width={1.2} height={60} />
            <Button variant="contained" onClick={printBarCode}>
              Print Barcode
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              padding: "10px",
              marginBottom: "5px",
            }}
          >
            <svg width="100" height="100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="blue"
                strokeWidth="4"
                fill="yellow"
              />
              <text
                x="50"
                y="50"
                alignmentBaseline="middle"
                textAnchor="middle"
                fill="#000"
                fontSize="12"
              >
                ${postageCost}
              </text>
            </svg>
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "auto",
            my: 2,
            mx: 4,
          }}
        />
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "40px",
            "& .MuiTextField-root": { m: 1, minWidth: 600, fontSize: "20px" },
          }}
          noValidate
          autoComplete="off"
        >
          <GlobalStyles
            styles={{
              ".styled-textfield": {
                backgroundColor: "#F0F0F0",
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "16px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  fontSize: "16px",
                  backgroundColor: "#F0F0F0",
                },
              },
            }}
          />
          <div>
            <TextField
              className="styled-textfield"
              required
              id="outlined-required"
              label="Sender's email address"
            />
          </div>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#852318",
              color: "white",
              mt: 4,
              px: 5,
              textTransform: "none",
              marginLeft: "10px",
              fontSize: "16px",
            }}
          >
            Send receipt through email
          </Button>

          <Divider
            sx={{
              marginTop: 10,
              marginBottom: 2,
              border: "1px solid grey",
              width: "100%",
            }}
          />

          <Button
            variant="contained"
            onClick={printReceipt}
            sx={{
              backgroundColor: "#852318",
              color: "white",
              mt: 4,
              px: 5,
              textTransform: "none",
              marginLeft: "10px",
              marginBottom: "50px",
              fontSize: "16px",
            }}
          >
            Print receipt
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmationPage;
