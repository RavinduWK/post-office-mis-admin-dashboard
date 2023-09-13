import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

const BarChart = ({ labels, data, options, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const defaultData = {
    labels: labels || [
      "Normal Post",
      "Registered Post",
      "Logi Post",
      "Courier",
      "Placed Money Orders",
      "Payed Money Orders",
    ],
    datasets: [
      {
        label: title || "Daily Services Count",
        data: data || [12, 19, 3, 5, 2, 10], // Default data
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(103, 22, 55, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(103, 22, 55, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const defaultOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
    ...options,
  };

  return <Bar data={defaultData} options={defaultOptions} />;
};

export default BarChart;
