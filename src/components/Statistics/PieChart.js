import React from "react";
import { Pie } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

const DailyRevenuePieChart = ({ dataValues }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = {
    labels: [
      "Normal Post",
      "Registered Post",
      "Logi Post",
      "Courier",
      "Placed Money Orders",
    ],
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default DailyRevenuePieChart;
