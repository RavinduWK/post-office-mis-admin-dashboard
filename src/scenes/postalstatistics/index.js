import React, { useRef, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import DailyServicesBarGraph from "./BarGraph";
import { tokens } from "../../theme";
import DailyRevenuePieChart from "./DailyRevenuePieChart";
import LineGraph from "./LineGraph";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SmallBoxes from "./SmallBoxes";

const Statistics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const pdfRef = useRef(null);

  useEffect(() => {
    if (pdfRef.current) {
      console.log("pdfRef is set", pdfRef.current);
    } else {
      console.log("pdfRef is not set");
    }
  }, []);

  const printDocument = () => {
    const input = pdfRef.current;

    if (!input) {
      console.error("Invalid input element");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Statistics-${new Date().toISOString()}.pdf`);
    });
  };

  return (
    <Box
      ref={pdfRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%", // Take up full width to allow space-between to work
        }}
      >
        <Box sx={{ marginLeft: "10px" }}>
          <SmallBoxes />
          <Box
            sx={{
              width: "850px",
              borderRadius: "10px",
              backgroundColor: colors.white,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              marginTop: "20px",
            }}
          >
            <h2>Daily Services Count</h2>
            <DailyServicesBarGraph />
          </Box>
          <Box
            sx={{
              width: "1000px",
              borderRadius: "10px",
              backgroundColor: colors.white,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              marginTop: "20px",
            }}
          >
            <h2>Line Graph</h2>
            <LineGraph />
          </Box>
        </Box>

        <Box sx={{ marginRight: "20px" }}>
          <Box
            sx={{
              width: "450px",
              heoght: "700px",
              borderRadius: "10px",
              backgroundColor: colors.white,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              marginTop: "20px",
            }}
          >
            <h2>Daily Revenue</h2>
            <DailyRevenuePieChart />
          </Box>
          <Box
            sx={{
              width: "450px",
              heoght: "700px",
              borderRadius: "10px",
              backgroundColor: colors.white,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              marginTop: "20px",
            }}
          >
            <h2>Daily Revenue</h2>
            <DailyRevenuePieChart />
          </Box>
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={printDocument}>
        Print
      </Button>
    </Box>
  );
};

export default Statistics;
