import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

const generateDates = (startDate, numberOfDays) => {
  const dates = [];
  let currentDate = new Date(startDate);
  for (let i = 0; i < numberOfDays; i++) {
    dates.push(
      `${currentDate.getFullYear()}/${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}/${String(currentDate.getDate()).padStart(2, "0")}`
    );
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const LineChart = ({
  startDate = "2023/05/06",
  numberOfDays = 50,
  datasets,
  options,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const labels = generateDates(startDate, numberOfDays);

  const defaultData = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors.someColor,
      borderColor: dataset.borderColor || colors.someBorderColor,
      borderWidth: dataset.borderWidth || 1,
      tension: dataset.tension || 0.5,
    })),
  };

  const defaultOptions = {
    scales: {
      x: {
        ticks: {
          callback: function (value, index) {
            return index % 5 === 0 ? value : "";
          },
        },
      },
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

  return <Line data={defaultData} options={defaultOptions} />;
};

export default LineChart;
