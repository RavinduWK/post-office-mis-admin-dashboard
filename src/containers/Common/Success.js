import React from "react";

function SuccessMessage() {
  return (
    <div style={styles.container}>
      <div style={styles.message}>Successfully Submitted</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  message: {
    fontSize: "2em",
    fontWeight: "bold",
    color: "#28a745",
    animation: "fadeIn 1.5s",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
};

export default SuccessMessage;
