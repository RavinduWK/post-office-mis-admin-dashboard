import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

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

const LineGraph = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const labels = generateDates("2023/05/06", 50);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Normal Post",
        data: [
          23, 45, 12, 67, 89, 34, 56, 78, 90, 21, 43, 65, 87, 9, 31, 53, 75, 97,
          19, 41, 63, 85, 7, 29, 51, 73, 95, 17, 39, 61, 83, 5, 27, 49, 71, 93,
          15, 37, 59, 81, 3, 25, 47, 69, 91, 13, 35, 57, 79, 1,
        ],
        backgroundColor: colors.someColor, // Replace with your actual color
        borderColor: colors.someBorderColor, // Replace with your actual border color
        borderWidth: 1,
        tension: 0.5,
      },
      {
        label: "Registered Post",
        data: [
          12, 46, 89, 34, 57, 21, 68, 92, 43, 76, 9, 31, 54, 87, 20, 63, 95, 28,
          51, 74, 97, 16, 39, 62, 85, 8, 30, 53, 76, 99, 14, 37, 60, 83, 6, 29,
          52, 75, 98, 13, 36, 59, 82, 5, 28, 51, 74, 97, 10, 33,
        ],
        backgroundColor: colors.someColor, // Replace with your actual color
        borderColor: colors.someBorderColor, // Replace with your actual border color
        borderWidth: 1,
        tension: 0.5,
      },
      {
        label: "Logi Post",
        data: [
          44, 67, 90, 23, 46, 69, 92, 15, 38, 61, 84, 7, 30, 53, 76, 99, 22, 45,
          68, 91, 14, 37, 60, 83, 6, 29, 52, 75, 98, 21, 44, 67, 90, 13, 36, 59,
          82, 5, 28, 51, 74, 97, 20, 43, 66, 89, 12, 35, 58, 81,
        ],
        backgroundColor: colors.someColor, // Replace with your actual color
        borderColor: colors.someBorderColor, // Replace with your actual border color
        borderWidth: 1,
        tension: 0.5,
      },
      {
        label: "Fast Track Courier",
        data: [
          3, 26, 49, 72, 95, 18, 41, 64, 87, 10, 33, 56, 79, 2, 25, 48, 71, 94,
          17, 40, 63, 86, 9, 32, 55, 78, 1, 24, 47, 70, 93, 16, 39, 62, 85, 8,
          31, 54, 77, 0, 23, 46, 69, 92, 15, 38, 61, 84, 7,
        ], // Replace these numbers with your actual data
        backgroundColor: colors.someColor, // Replace with your actual color
        borderColor: colors.someBorderColor, // Replace with your actual border color
        borderWidth: 1,
        tension: 0.5,
      },
      {
        label: "Accepted Money Orders",
        data: [
          30, 35, 36, 39, 22, 35, 38, 31, 34, 37, 60, 83, 6, 29, 52, 75, 98, 21,
          44, 67, 90, 13, 36, 59, 82, 5, 28, 51, 74, 97, 20, 43, 66, 89, 12, 35,
          58, 81, 4, 27, 50, 73, 96, 19, 42, 65, 88, 11, 34, 57,
        ], // Replace these numbers with your actual data
        backgroundColor: colors.someColor, // Replace with your actual color
        borderColor: colors.someBorderColor, // Replace with your actual border color
        borderWidth: 1,
        tension: 0.5,
      },
    ],
  };

  const options = {
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
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
