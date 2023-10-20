import React, { useState, useRef } from "react";
import { Box, Divider, Button, TextField, GlobalStyles } from "@mui/material";
import Barcode from "react-barcode";
import { toJpeg } from "html-to-image";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

function ConfirmationPage() {
  const [senderEmail, setSendersEmail] = useState("");
  const location = useLocation();
  const { mailId, securityNumber, cost, type } = location.state || {};
  const receiptRef = useRef(null);
  const barcodeRef = useRef(null);
  const labelRef = useRef(null);

  const handleSendEmail = () => {
    if (senderEmail.trim() === "") {
      alert("Please enter a recipient's email address.");
      return;
    }

    // Send the email using emailjs
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_SENDER_TEMPLATE_ID,
        {
          to_email: senderEmail,
          type: type,
          PID: mailId,
          security_code: securityNumber,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Receipt sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the receipt. Please try again.");
        }
      );
  };

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
      link.download = "barcode.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  const printLabel = () => {
    const node = document.createElement("div");
    node.style.display = "flex";
    node.style.justifyContent = "center";
    node.style.alignItems = "center";

    node.style.backgroundColor = "white";
    node.appendChild(labelRef.current.cloneNode(true));

    toJpeg(node, { quality: 0.95, width: 100, height: 100 }).then(function (
      dataUrl
    ) {
      var link = document.createElement("a");
      link.download = "barcode.jpeg";
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
          <Box ref={receiptRef}>
            <Box>
              <div>PID: {mailId} </div>
              <div>Security Number: {securityNumber}</div>
            </Box>
          </Box>

          <Divider
            sx={{
              marginTop: 5,
              marginBottom: 2,
              border: "1px solid grey",
              width: "100%",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box ref={barcodeRef}>
              <Barcode value={mailId} width={1.2} height={60} />
            </Box>

            <Button
              variant="contained"
              onClick={printBarCode}
              sx={{
                backgroundColor: "#545454",
                color: "white",
                my: 2,
                px: 4,
                textTransform: "none",
                marginLeft: "14px",
                marginBottom: "50px",
                fontSize: "14px",
              }}
            >
              Print Barcode
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box
              ref={labelRef}
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
                  Rs. {cost}.00
                </text>
              </svg>
            </Box>
            <Button
              variant="contained"
              onClick={printLabel}
              sx={{
                backgroundColor: "#545454",
                color: "white",
                my: 2,
                px: 4,
                textTransform: "none",
                marginLeft: "14px",
                marginBottom: "50px",
                fontSize: "14px",
              }}
            >
              Print Label
            </Button>
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
              value={senderEmail}
              onChange={(e) => setSendersEmail(e.target.value)}
            />
          </div>

          <Button
            variant="contained"
            onClick={handleSendEmail}
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
