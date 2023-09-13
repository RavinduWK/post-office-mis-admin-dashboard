import React, { useRef, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import PieChart from "../../components/Charts/PieChart";
import LineChart from "../../components/Charts/LineChart";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SmallBoxes from "../../components/SmallBoxes";
import BarChart from "./../../components/Charts/BarChart";

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
          width: "100%",
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
            <BarChart
              labels={[
                "Normal Post",
                "Registered Post",
                "Logi Post",
                "Courier",
                "Placed Money Orders",
                "Payed Money Orders",
              ]}
              data={[12, 19, 3, 5, 2, 10]}
              title="Daily Services Count"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Count",
                    },
                  },
                },
              }}
            />
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
            <LineChart
              startDate="2023/05/06"
              numberOfDays={50}
              datasets={[
                {
                  label: "Normal Post",
                  data: [
                    23, 45, 12, 67, 89, 34, 56, 78, 90, 21, 43, 65, 87, 9, 31,
                    53, 75, 97, 19, 41, 63, 85, 7, 29, 51, 73, 95, 17, 39, 61,
                    83, 5, 27, 49, 71, 93, 15, 37, 59, 81, 3, 25, 47, 69, 91,
                    13, 35, 57, 79, 1,
                  ],
                  backgroundColor: colors.someColor,
                  borderColor: colors.someBorderColor,
                  borderWidth: 1,
                  tension: 0.5,
                },
                {
                  label: "Registered Post",
                  data: [
                    12, 46, 89, 34, 57, 21, 68, 92, 43, 76, 9, 31, 54, 87, 20,
                    63, 95, 28, 51, 74, 97, 16, 39, 62, 85, 8, 30, 53, 76, 99,
                    14, 37, 60, 83, 6, 29, 52, 75, 98, 13, 36, 59, 82, 5, 28,
                    51, 74, 97, 10, 33,
                  ],
                  backgroundColor: colors.someColor,
                  borderColor: colors.someBorderColor,
                  borderWidth: 1,
                  tension: 0.5,
                },
                {
                  label: "Logi Post",
                  data: [
                    44, 67, 90, 23, 46, 69, 92, 15, 38, 61, 84, 7, 30, 53, 76,
                    99, 22, 45, 68, 91, 14, 37, 60, 83, 6, 29, 52, 75, 98, 21,
                    44, 67, 90, 13, 36, 59, 82, 5, 28, 51, 74, 97, 20, 43, 66,
                    89, 12, 35, 58, 81,
                  ],
                  backgroundColor: colors.someColor,
                  borderColor: colors.someBorderColor,
                  borderWidth: 1,
                  tension: 0.5,
                },
                {
                  label: "Fast Track Courier",
                  data: [
                    3, 26, 49, 72, 95, 18, 41, 64, 87, 10, 33, 56, 79, 2, 25,
                    48, 71, 94, 17, 40, 63, 86, 9, 32, 55, 78, 1, 24, 47, 70,
                    93, 16, 39, 62, 85, 8, 31, 54, 77, 0, 23, 46, 69, 92, 15,
                    38, 61, 84, 7,
                  ],
                  backgroundColor: colors.someColor,
                  borderColor: colors.someBorderColor,
                  borderWidth: 1,
                  tension: 0.5,
                },
                {
                  label: "Accepted Money Orders",
                  data: [
                    30, 35, 36, 39, 22, 35, 38, 31, 34, 37, 60, 83, 6, 29, 52,
                    75, 98, 21, 44, 67, 90, 13, 36, 59, 82, 5, 28, 51, 74, 97,
                    20, 43, 66, 89, 12, 35, 58, 81, 4, 27, 50, 73, 96, 19, 42,
                    65, 88, 11, 34, 57,
                  ],
                  backgroundColor: colors.someColor,
                  borderColor: colors.someBorderColor,
                  borderWidth: 1,
                  tension: 0.5,
                },
              ]}
              options={{}}
            />
          </Box>
        </Box>

        <Box sx={{ marginRight: "20px" }}>
          <Box
            sx={{
              width: "450px",
              height: "600px",
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
            <PieChart />
          </Box>
          <Box
            sx={{
              width: "450px",
              height: "600px",
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
            <PieChart />
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
