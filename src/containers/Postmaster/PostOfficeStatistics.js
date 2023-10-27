import React, { useRef, useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import PieChart from "../../components/Statistics/PieChart";
import LineChart from "../../components/Statistics/LineChart";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SmallBoxes from "../../components/Statistics/SmallBoxes";
import BarChart from "./../../components/Statistics/BarChart";
import { Chart, registerables } from "chart.js";
import {
  getDailyServices,
  getDataForLineChart,
  getRevenueData,
} from "../../data/databaseFunctions";

Chart.register(...registerables);

const Statistics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const pdfRef = useRef(null);
  const [dataForLineChart, setDataForLineChart] = useState([]);
  const [dataForBarChart, setDataForBarChart] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const setLineChartData = async (event) => {
    const temp = await getDataForLineChart();
    setDataForLineChart(temp);
  };

  const setBarChartData = async (event) => {
    const temp = await getDailyServices();
    setDataForBarChart(temp);
  };

  const setRevenue = async (event) => {
    const temp = await getRevenueData();
    setRevenueData(temp);
  };

  useEffect(() => {
    setRevenue();
    setLineChartData();
    setBarChartData();
  },[]);

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
      <Box display="flex" justifyContent="Center">
        <Box sx={{ marginLeft: "10px" }}>
          <center>
            <SmallBoxes totalRev={revenueData[1]} />
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
              <PieChart dataValues={revenueData} />
            </Box>
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
                  "Paid Money Orders",
                ]}
                data={dataForBarChart}
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
                startDate={dataForLineChart[0]}
                numberOfDays={dataForLineChart[1]}
                datasets={[
                  {
                    label: "Normal Post",
                    data: dataForLineChart[2],
                    backgroundColor: colors.someColor,
                    borderColor: colors.someBorderColor,
                    borderWidth: 1,
                    tension: 0.5,
                  },
                  {
                    label: "Registered Post",
                    data: dataForLineChart[3],
                    backgroundColor: colors.someColor,
                    borderColor: colors.someBorderColor,
                    borderWidth: 1,
                    tension: 0.5,
                  },
                  {
                    label: "Logi Post",
                    data: dataForLineChart[4],
                    backgroundColor: colors.someColor,
                    borderColor: colors.someBorderColor,
                    borderWidth: 1,
                    tension: 0.5,
                  },
                  {
                    label: "Fast Track Courier",
                    data: dataForLineChart[5],
                    backgroundColor: colors.someColor,
                    borderColor: colors.someBorderColor,
                    borderWidth: 1,
                    tension: 0.5,
                  },
                  {
                    label: "Accepted Money Orders",
                    data: dataForLineChart[6],
                    backgroundColor: colors.someColor,
                    borderColor: colors.someBorderColor,
                    borderWidth: 1,
                    tension: 0.5,
                  },
                ]}
                options={{}}
              />
            </Box>
          </center>
        </Box>
      </Box>
      <Box display="flex" justifyContent="Center" marginBottom={5}>
        <Button
          onClick={printDocument}
          variant="contained"
          sx={{
            marginTop: "60px",
            backgroundColor: "#852318",
            color: "white",
            width: "450px",
            px: 10,
            py: 1,
            textTransform: "none",
            fontSize: "18px",
            borderRadius: "6px",
          }}
        >
          Print Statistical Report
        </Button>
      </Box>
    </Box>
  );
};

export default Statistics;
