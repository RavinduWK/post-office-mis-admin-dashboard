import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";

const LineGraph2 = () => {
  const theme = useTheme();

  const data = {
    labels: [
      "2023/05/06",
      "2023/05/07",
      "2023/05/08",
      "2023/05/09",
      "2023/05/10",
    ], // Add your dates here
    datasets: [
      {
        label: "Revenue",
        data: [12, 19, 3, 5, 2], // Replace these numbers with your actual data
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
        tension: 0.4, // This will make the line curvy
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineGraph2;
